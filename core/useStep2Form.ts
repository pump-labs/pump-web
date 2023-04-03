import axios from 'axios';
import { Store } from 'hooks/api/store/useGetStore';
import { patchStore } from 'hooks/api/store/usePatchStore';
import { postStore } from 'hooks/api/store/usePostStore';
import { patchManager } from 'hooks/api/user/usePatchManager';
import { useS3Upload } from 'next-s3-upload';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, RefObject, useRef, useState } from 'react';
import useModalStore, { MODAL_KEY } from 'store/actions/modalStore';
import { step1RequestStore } from 'store/actions/step1Store';
import { step2ErrorStore, step2RequestStore } from 'store/actions/step2Store';
import {
	checkEmptyInputError,
	extractBusinessLicenseExceptHyhpen,
	handleFindCoords,
	IBusinessLicenseStatusResponse,
	makeBusinessHourData,
	makeImgPath,
	makeStoreAddress,
	refineStoreBusinessHoursStringToArray,
	saveStep2UserInput,
} from './storeRegistrationService';
export const useStep2Form = () => {
	const router = useRouter();
	const query = useSearchParams();
	const num = /[-0-9]/;
	const [businessHourValues, setBusinessHourValues] = useState<Array<{ day: string; time: string | null }>>([]);
	const { step2Request, setStep2Request } = step2RequestStore();
	const { imgPath, registrationNumber, setInputState, setInitialValue } = step2ErrorStore();
	const { modalKey, changeModalKey } = useModalStore();
	const [storePostcodeInputs, setStorePostcodeInputs] = useState({
		address: '', // 기본 주소
		detailAddress: '', // 상세 주소
	});
	const businessLicenseInputRef = useRef() as RefObject<HTMLInputElement>;
	const dayOffRef = useRef<null[] | Array<RefObject<HTMLButtonElement>> | HTMLButtonElement[]>([]);
	const [dayOffStatus, setDayOffStatus] = useState<boolean[]>([false, false, false, false, false, false, false, false]);
	const [storeCallNumber, setStoreCallNumber] = useState('');
	const [selectedStoreImageBtn, setSelectedStoreImageBtn] = useState(imgPath.value[0] ? 'registrationImage' : 'defaultImage');
	const [clientStoreImageURL, setClientStoreImageURL] = useState('');
	const [S3ImagePath, setS3ImagePath] = useState(imgPath.value[0] ?? '');
	const [selectedBusinessHourBtn, setSelectedBusinessHourBtn] = useState('weekDaysWeekEnd');
	const { step1Request } = step1RequestStore();
	const { uploadToS3 } = useS3Upload();
	const setData = (data: Store | null | undefined) => {
		if (data && query?.get('storeId') !== null) {
			setInitialValue(data);
			if (data?.callNumber !== '' && data?.callNumber !== null) setStoreCallNumber(data.callNumber);
			if (data?.businessHour !== null && data?.businessHour !== '') {
				setBusinessHourValues(refineStoreBusinessHoursStringToArray(data?.businessHour));
				setSelectedBusinessHourBtn('eachDays');
			}
			if (data?.imgStore?.length > 0 && data?.imgStore !== null && data?.imgStore !== undefined) {
				setClientStoreImageURL(data?.imgStore[0]?.path ?? '');
				setS3ImagePath(data?.imgStore[0]?.path ?? '');
				setSelectedStoreImageBtn('registerImage');
			}
			if (data?.address !== '' && data?.address !== null) {
				setStorePostcodeInputs({
					address: data?.address?.split('#')[0] ?? '',
					detailAddress: data?.address?.split('#')[1] ?? '',
				});
			}
			if (data?.callNumber !== '' && data?.callNumber !== null) setStoreCallNumber(data?.callNumber ?? '');
		}
	};
	const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const emptyInput = checkEmptyInputError(e.currentTarget.step2, setInputState);
		if (
			registrationNumber.isError === 'notClicked' ||
			(e.currentTarget.step2[0].value !== '' && registrationNumber.isError === 'normal')
		) {
			setInputState('registrationNumber', 'notClicked');
			const registrationNumComponent: HTMLElement | null = document.getElementById('registrationNumber');
			if (registrationNumComponent && registrationNumComponent !== null) {
				window.scrollTo({
					top: registrationNumComponent.getBoundingClientRect().top - 140 + window.scrollY,
					behavior: 'smooth',
				});
			}
			return;
		} else if (registrationNumber.isError === 'fail') {
			const registrationNumComponent: HTMLElement | null = document.getElementById('registrationNumber');
			if (registrationNumComponent && registrationNumComponent !== null) {
				window.scrollTo({
					top: registrationNumComponent.getBoundingClientRect().top - 140 + window.scrollY,
					behavior: 'smooth',
				});
			}
			return;
		} else if (emptyInput[0] !== 0 && emptyInput[2] !== '' && document.getElementById(emptyInput[2].toString())) {
			const emptyComponent: HTMLElement | null = document.getElementById(emptyInput[2].toString());
			if (emptyComponent && emptyComponent !== null) {
				window.scrollTo({
					top: emptyComponent.getBoundingClientRect().top - 140 + window.scrollY,
					behavior: 'smooth',
				});
			}
			return;
		}

		await saveStep2UserInput(e.currentTarget.step2, setStep2Request);
		await makeBusinessHourData(dayOffRef, selectedBusinessHourBtn, setStep2Request);
		await makeStoreAddress(storePostcodeInputs, setStep2Request);
		const coords = await handleFindCoords(storePostcodeInputs.address);
		setStep2Request('longitude', coords[0]);
		setStep2Request('latitude', coords[1]);
		await makeImgPath(selectedStoreImageBtn, S3ImagePath, setStep2Request);

		if (query?.toString() === '') changeModalKey(MODAL_KEY.ON_STORE_REGISTRATION_STEP_CHANGE_CONFIRM_MODAL);
		else changeModalKey(MODAL_KEY.ON_STORE_EDIT_COMPLETION_CONFIRM_MODAL);
	};
	const handleCallNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newText = e.target.value;
		const num = /[-0-9 ]/;
		if (newText.length > 0 && !num.test(newText[newText.length - 1])) return;

		setStoreCallNumber(e.target.value);
	};
	const submitInputs = async () => {
		await patchManager(step1Request);
		const step2Response = await postStore(step2Request);
		router.replace(`/registration/step3?id=${step2Response.storeId}`);
	};
	const submitEditInputs = async () => {
		const step2EditResponse = await patchStore({ ...step2Request, id: Number(query?.get('storeId')) });
		router.replace(`/mypage/store`);
	};
	const handleSelectedStoreImageBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (selectedStoreImageBtn === e.target.value) return;
		setSelectedStoreImageBtn(e.target.value);
		if (e.target.value === 'defaultImage') {
			setClientStoreImageURL('');
		}
	};
	const handleSelectedBusinessHourBtn = (buttonName: string) => {
		if (selectedBusinessHourBtn === buttonName) return;
		setSelectedBusinessHourBtn(buttonName);
	};
	const handleExtractedPostCode = (extractedPostcode: string[]) => {
		const [zonecode, address] = extractedPostcode;
		if (address !== '') setInputState('basicAddress', 'normal');
		setStorePostcodeInputs({
			...storePostcodeInputs,
			address,
		});
	};
	const handleStoreAddressDetailChange = (event: ChangeEvent<HTMLInputElement>) => {
		setStorePostcodeInputs({
			...storePostcodeInputs,
			detailAddress: event.target.value,
		});
	};
	const handleTimePickerInput = (arrIndex: number) => {
		setDayOffStatus({ ...dayOffStatus, [arrIndex]: !dayOffStatus[arrIndex] });
	};
	const handleBusinessLicenseStatusCheck = async () => {
		if (!businessLicenseInputRef.current) return;

		const businessLicenseStatusResponse = await axios.post<IBusinessLicenseStatusResponse>(
			`${process.env.NEXT_PUBLIC_NTS_API_BASE_URL}/status${
				process.env.NEXT_PUBLIC_NTS_API_KEY && `?serviceKey=${process.env.NEXT_PUBLIC_NTS_API_KEY}`
			}`,
			{
				b_no: [extractBusinessLicenseExceptHyhpen(businessLicenseInputRef.current?.value)],
			},
		);

		const { b_stt_cd, tax_type } = businessLicenseStatusResponse.data.data[0];

		if (tax_type === '국세청에 등록되지 않은 사업자등록번호입니다.') {
			setInputState('registrationNumber', 'fail');
		}
		if (b_stt_cd === '01') {
			setInputState('registrationNumber', 'success');
		}
		businessLicenseInputRef.current.blur();
	};
	const handleUploadToClient = async (e: ChangeEvent<HTMLInputElement>) => {
		if (clientStoreImageURL) URL.revokeObjectURL(clientStoreImageURL);
		if (e.target.files !== null) {
			setClientStoreImageURL(URL.createObjectURL(e.target.files[0]));
			const { url } = await uploadToS3(e.target.files[0]);
			setS3ImagePath(url);
		}
		setInputState('imgPath', 'normal');
	};
	return {
		businessHourValues,
		query,
		handleUploadToClient,
		handleBusinessLicenseStatusCheck,
		handleTimePickerInput,
		handleStoreAddressDetailChange,
		handleExtractedPostCode,
		submitInputs,
		imgPath,
		registrationNumber,
		setInputState,
		handleOnSubmit,
		businessLicenseInputRef,
		handleSelectedBusinessHourBtn,
		handleCallNumber,
		setClientStoreImageURL,
		setDayOffStatus,
		storeCallNumber,
		handleSelectedStoreImageBtn,
		storePostcodeInputs,
		clientStoreImageURL,
		selectedStoreImageBtn,
		dayOffStatus,
		selectedBusinessHourBtn,
		changeModalKey,
		dayOffRef,
		setData,
		modalKey,
		submitEditInputs,
	};
};

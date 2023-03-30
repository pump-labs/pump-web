import axios from 'axios';
import { ItemsRequest } from 'hooks/api/items/usePostItems';
import { ChangeEvent, MutableRefObject, RefObject } from 'react';
import { Product } from 'store/actions/productStore';

export interface IBusinessLicenseStatusResponse {
	match_cnt: number;
	request_cnt: number;
	status_code: string;
	data: Array<{
		b_no: string;
		b_stt: '01' | '02' | '03';
		b_stt_cd: '01' | '02' | '03';
		tax_type: string;
		tax_type_cd: '1' | '2' | '3' | '4' | '5' | '6' | '7';
		end_dt: string;
		utcc_yn: 'Y' | 'N';
		tax_type_change_dt: string;
		invoice_apply_at: string;
	}>;
}
export const handleFindCoords = async (storeAddress: string) => {
	const location: string[] = [];
	await axios
		.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${storeAddress}`, {
			headers: {
				Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_MAP_REST_KEY}`, // REST API 키
			},
		})
		.then((res) => {
			const address = res.data.documents[0].address;
			location.push(address.x as string);
			location.push(address.y as string);
		});
	return location;
};

export const extractBusinessLicenseExceptHyhpen = (businessLicense: string) => {
	return businessLicense
		.split('')
		.filter((c) => c !== '-')
		.join('');
};
export const emailRegEx = /^[A-Za-z0-9]*@[A-Za-z0-9]*\.[A-Za-z]{2,3}$/;
export const checkEmptyInputError = (
	inputArr: RadioNodeList,
	setInputState: (inputId: string, inputState: 'normal' | 'error' | 'success' | 'notClicked' | 'fail') => void,
) => {
	let emptyInput = 0;
	let flag = false;
	let firstError = '';
	for (let i = 0; i < inputArr.length; i++) {
		if ((inputArr[i] as HTMLInputElement).value === '' && (inputArr[i] as HTMLInputElement).id !== 'instaAccount') {
			setInputState((inputArr[i] as HTMLInputElement).id, 'error');
			emptyInput++;
			if (firstError === '') firstError = (inputArr[i] as HTMLInputElement).id;
		}
		if ((inputArr[i] as HTMLInputElement).id === 'email') {
			if (!emailRegEx.test((inputArr[i] as HTMLInputElement).value)) flag = true;
		}
	}
	return [emptyInput, flag, firstError];
};

export const saveStep2UserInput = async (
	inputArr: RadioNodeList,
	setFunc: (inputId: string, inputValue: string | string[] | null) => void,
) => {
	for (let i = 0; i < inputArr.length; i++) {
		if (
			(inputArr[i] as HTMLInputElement).id === 'businessHour' ||
			(inputArr[i] as HTMLInputElement).id === 'storeZonecode' ||
			(inputArr[i] as HTMLInputElement).id === 'basicAddress' ||
			(inputArr[i] as HTMLInputElement).id === 'addressDetail' ||
			(inputArr[i] as HTMLInputElement).id === 'imgPath'
		)
			continue;

		if ((inputArr[i] as HTMLInputElement).value !== '') {
			setFunc((inputArr[i] as HTMLInputElement).id, (inputArr[i] as HTMLInputElement).value);
		}
		if ((inputArr[i] as HTMLInputElement).value === '' && (inputArr[i] as HTMLInputElement).id === 'instaAccount') {
			setFunc('instaAccount', null);
		}
	}
};
export const saveUserInput = async (inputArr: RadioNodeList, setFunc: (inputId: string, inputValue: string) => void) => {
	for (let i = 0; i < inputArr.length; i++) {
		if ((inputArr[i] as HTMLInputElement).value !== '') {
			setFunc((inputArr[i] as HTMLInputElement).id, (inputArr[i] as HTMLInputElement).value);
		}
	}
};
export const businessHourDays = [
	{ id: 2, day: '월' },
	{ id: 3, day: '화' },
	{ id: 4, day: '수' },
	{ id: 5, day: '목' },
	{ id: 6, day: '금' },
	{ id: 7, day: '토' },
	{ id: 8, day: '일' },
];
export const makeBusinessHourData = (
	refArr: MutableRefObject<Array<RefObject<HTMLButtonElement>> | null[] | HTMLButtonElement[]>,
	selectedBusinessHourBtn: string,
	setFunc: (inputId: string, inputValue: string) => void,
) => {
	const businessHourArr: Array<{ day: string; time: string }> = [];
	if (selectedBusinessHourBtn === 'weekDaysWeekEnd') {
		for (let i = 0; i < 5; i++) {
			businessHourArr.push({ day: businessHourDays[i].day, time: (refArr.current[0] as HTMLButtonElement).value });
		}
		for (let i = 5; i < 7; i++) {
			businessHourArr.push({ day: businessHourDays[i].day, time: (refArr.current[1] as HTMLButtonElement).value });
		}
	} else {
		for (let i = 0; i < 7; i++) {
			businessHourArr.push({
				day: businessHourDays[i].day,
				time: (refArr.current[businessHourDays[i].id] as HTMLButtonElement).value,
			});
		}
	}
	setFunc('businessHour', JSON.stringify(businessHourArr));
};
export const makeStoreAddress = (
	address: {
		address: string;
		detailAddress: string;
	},
	setFunc: (inputId: string, inputValue: string) => void,
) => {
	setFunc('address', `${address.address}#${address.detailAddress}`);
};
export const makeImgPath = (
	selectedButton: string,
	imgPath: string,
	setFunc: (inputId: string, inputValue: string | string[] | null) => void,
) => {
	if (selectedButton === 'defaultImage') setFunc('imgPath', null);
	else {
		setFunc('imgPath', [imgPath]);
	}
};
export const makeItemsRequest = (itemsArr: Product[]) => {
	const itemsRequest: ItemsRequest[] = [];
	for (let i = 0; i < itemsArr.length; i++) {
		const cur = itemsArr[i];
		if (cur.brandName === '' && cur.productName === '') continue;
		itemsRequest.push({
			id: cur.id ?? null,
			title: cur.productName !== '' ? cur.productName : null,
			category: cur.category,
			brand: cur.brandName !== '' ? cur.brandName : null,
		});
	}
	return itemsRequest;
};

type StoreBusinessHour = {
	day?: string;
	time?: string;
};
const defaultBusinessHoursArray: StoreBusinessHour[] = [
	{
		day: '월',
		time: '10:00~22:00',
	},
	{
		day: '화',
		time: '10:00~22:00',
	},
	{
		day: '수',
		time: '10:00~22:00',
	},
	{
		day: '목',
		time: '10:00~22:00',
	},
	{
		day: '금',
		time: '10:00~22:00',
	},
	{
		day: '토',
		time: '10:00~22:00',
	},
	{
		day: '일',
		time: '10:00~22:00',
	},
];

export const refineStoreBusinessHoursStringToArray = (businessHoursString: string) => {
	return businessHoursString ? JSON.parse(businessHoursString) : defaultBusinessHoursArray;
};

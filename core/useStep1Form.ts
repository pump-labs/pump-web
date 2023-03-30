import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import useModalStore from 'store/actions/modalStore';
import { step1ErrorStore, step1RequestStore } from 'store/actions/step1Store';
import { checkEmptyInputError, saveUserInput } from './storeRegistrationService';

export const useStep1Form = () => {
	const router = useRouter();
	const { modalKey, changeModalKey } = useModalStore();
	const { changeError, changeFormError } = step1ErrorStore();
	const { setStep1Request } = step1RequestStore();
	const [customPhoneNum, setCustomPhoneNum] = useState('');
	const [currentKey, setCurrentKey] = useState('');
	const handlePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
		let newText = e.target.value;
		const num = /[-0-9]/;
		if (newText.length > 0 && !num.test(newText[newText.length - 1])) return;
		if (newText.length > 13) return;
		if (newText.length === 13) {
			setCustomPhoneNum(newText.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
			return;
		}
		if (currentKey !== 'Backspace' && (newText.length === 3 || newText.length === 8)) {
			newText += '-';
		}
		setCustomPhoneNum(newText.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
	};
	const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const checkResult = checkEmptyInputError(e.currentTarget.step1, changeError);
		if (checkResult[0] !== 0) return;
		if (checkResult[1]) {
			changeFormError();
			return;
		}
		await saveUserInput(e.currentTarget.step1, setStep1Request);
		router.replace('/registration/step2');
	};
	// 훅을 사용하는 쪽에 제공하는 api다
	return {
		modalKey,
		changeModalKey,
		customPhoneNum,
		setCurrentKey,
		currentKey,
		setCustomPhoneNum,
		handleOnSubmit,
		handlePhoneNumber,
	};
};

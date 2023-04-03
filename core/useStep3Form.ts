import { useGetItems } from 'hooks/api/items/useGetItems';
import { patchItems } from 'hooks/api/items/usePatchItems';
import { postItems } from 'hooks/api/items/usePostItems';
import { temporaryPostItems } from 'hooks/api/items/useTemporaryPostItems';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import useModalStore, { MODAL_KEY } from 'store/actions/modalStore';
import { productStore } from 'store/actions/productStore';
import { makeItemsEditRequest, makeItemsRequest } from './storeRegistrationService';

export const useStep3Form = () => {
	const router = useRouter();
	const query = useSearchParams();
	const { baseMakeUp, bodyHair, detergent, ingredient, etc, changeError, setProduct } = productStore();
	const { modalKey, changeModalKey } = useModalStore();
	const [temporarySaveToast, setTemporarySaveToast] = useState(false);
	const submitEditItems = async () => {
		const request = await makeItemsEditRequest([...baseMakeUp, ...bodyHair, ...detergent, ...ingredient, ...etc]);
		await patchItems(Number(query?.get('storeId')), request);
		changeModalKey(MODAL_KEY.OFF);
		router.push(`/mypage/store`);
	};
	const handleTemporarySave = async () => {
		if (changeError()[0] !== 0) {
			const emptyComponent: HTMLElement | null = document.getElementById(changeError()[1].toString());
			if (emptyComponent && emptyComponent !== null && changeError()[1] !== '') {
				window.scrollTo({
					top: emptyComponent.getBoundingClientRect().top - 110 + window.scrollY,
					behavior: 'smooth',
				});
			}
			return;
		}
		if (
			[...baseMakeUp, ...bodyHair, ...detergent, ...ingredient, ...etc].filter((item) => item.productName !== '').length === 0
		) {
			changeModalKey(MODAL_KEY.ON_STORE_PRODUCT_REQUIRED_WARNING_MODAL);
			return;
		}
		const request = makeItemsRequest([...baseMakeUp, ...bodyHair, ...detergent, ...ingredient, ...etc]);
		await temporaryPostItems(Number(query?.get('id')), request);
		setTemporarySaveToast(true);
		setTimeout(() => setTemporarySaveToast(false), 2000);
	};
	const handleSaveItems = () => {
		if (changeError()[0] !== 0) {
			const emptyComponent: HTMLElement | null = document.getElementById(changeError()[1].toString());
			if (emptyComponent && emptyComponent !== null && changeError()[1] !== '') {
				window.scrollTo({
					top: emptyComponent.getBoundingClientRect().top - 110 + window.scrollY,
					behavior: 'smooth',
				});
			}
			return;
		}
		if (
			[...baseMakeUp, ...bodyHair, ...detergent, ...ingredient, ...etc].filter((item) => item.productName !== '').length === 0
		) {
			changeModalKey(MODAL_KEY.ON_STORE_PRODUCT_REQUIRED_SAVE_WARNING_MODAL);
			return;
		} else {
			changeModalKey(MODAL_KEY.ON_STORE_REGISTRATION_CONFIRM_MODAL);
			const request = makeItemsRequest([...baseMakeUp, ...bodyHair, ...detergent, ...ingredient, ...etc]);
			return;
		}
	};
	const submitData = async () => {
		const request = makeItemsRequest([...baseMakeUp, ...bodyHair, ...detergent, ...ingredient, ...etc]);
		await postItems(Number(query?.get('id')), request);
		changeModalKey(MODAL_KEY.OFF);
		router.replace('/registration/success');
	};

	return {
		submitData,
		handleSaveItems,
		handleTemporarySave,
		submitEditItems,
		query,
		baseMakeUp,
		bodyHair,
		detergent,
		ingredient,
		etc,
		changeError,
		setProduct,
		temporarySaveToast,
		modalKey,
		changeModalKey,
	};
};

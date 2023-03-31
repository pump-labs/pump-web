'use client';
import { Accordion, AccordionDetails, AccordionSummary, withStyles } from '@material-ui/core';
import {
	StoreEditCompletionConfirmModal,
	StoreProductRequiredSaveWarningModal,
	StoreProductRequiredWarningModal,
	StoreRegistrationConfirmModal,
} from 'components/feature';
import ProductInfoElement from 'components/feature/ProductInfoElement';
import { LargeBtn, StyledLayout, Toast, Typography } from 'components/shared';
import { useStep3Form } from 'core/useStep3Form';
import { useGetItems } from 'hooks/api/items/useGetItems';
import { ExpandMoreIcon } from 'public/static/icons';
import { useEffect } from 'react';
import { MODAL_KEY } from 'store/actions/modalStore';
import styled from 'styled-components';
import { style, theme } from 'styles';

const Step3 = () => {
	const {
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
		temporarySaveToast,
		setProduct,
		modalKey,
		changeModalKey,
	} = useStep3Form();
	const { data } = useGetItems(Number(query?.get('storeId')));
	useEffect(() => {
		if (data) setProduct(data);
	}, [data]);

	return (
		<>
			<GuideWrapper>
				<Typography variant={'h2'} aggressive={'body_multiline_001'} color={theme.colors.gray_005}>
					※ 매장에서 판매 중인 “리필” 제품만 등록 부탁드립니다. 각 제품의 상품명은 필수 입력 사항입니다.
				</Typography>
			</GuideWrapper>
			<StAccordion>
				<StAccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant={'h3'} aggressive={'headline_oneline_004'} color={theme.colors.gray_007}>
						기초화장 / 세안
					</Typography>
				</StAccordionSummary>
				<StAccordionDetails id="baseMakeUp">
					{baseMakeUp.map(({ brandName, productName, isProductEmptyError }, index) => {
						return (
							<ProductInfoElement
								key={index}
								elementIdx={index}
								brandName={brandName}
								productName={productName}
								isProductEmptyError={isProductEmptyError}
								productArr={'baseMakeUp'}
							/>
						);
					})}
				</StAccordionDetails>
			</StAccordion>

			<StAccordion>
				<StAccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant={'h3'} aggressive={'headline_oneline_004'} color={theme.colors.gray_007}>
						바디 / 헤어
					</Typography>
				</StAccordionSummary>
				<StAccordionDetails id="bodyHair">
					{bodyHair.map(({ brandName, productName, isProductEmptyError }, index) => {
						return (
							<ProductInfoElement
								key={index}
								elementIdx={index}
								brandName={brandName}
								productName={productName}
								isProductEmptyError={isProductEmptyError}
								productArr={'bodyHair'}
							/>
						);
					})}
				</StAccordionDetails>
			</StAccordion>
			<StAccordion>
				<StAccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant={'h3'} aggressive={'headline_oneline_004'} color={theme.colors.gray_007}>
						세제
					</Typography>
				</StAccordionSummary>
				<StAccordionDetails id="detergent">
					{detergent.map(({ brandName, productName, isProductEmptyError }, index) => {
						return (
							<ProductInfoElement
								key={index}
								elementIdx={index}
								brandName={brandName}
								productName={productName}
								isProductEmptyError={isProductEmptyError}
								productArr={'detergent'}
							/>
						);
					})}
				</StAccordionDetails>
			</StAccordion>
			<StAccordion>
				<StAccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant={'h3'} aggressive={'headline_oneline_004'} color={theme.colors.gray_007}>
						식재료
					</Typography>
				</StAccordionSummary>
				<StAccordionDetails id="ingredient">
					{ingredient.map(({ brandName, productName, isProductEmptyError }, index) => {
						return (
							<ProductInfoElement
								key={index}
								elementIdx={index}
								brandName={brandName}
								productName={productName}
								isProductEmptyError={isProductEmptyError}
								productArr={'ingredient'}
							/>
						);
					})}
				</StAccordionDetails>
			</StAccordion>
			<StAccordion>
				<StAccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant={'h3'} aggressive={'headline_oneline_004'} color={theme.colors.gray_007}>
						기타
					</Typography>
				</StAccordionSummary>
				<StAccordionDetails id="etc">
					{etc.map(({ brandName, productName, isProductEmptyError }, index) => {
						return (
							<ProductInfoElement
								key={index}
								elementIdx={index}
								brandName={brandName}
								productName={productName}
								isProductEmptyError={isProductEmptyError}
								productArr={'etc'}
							/>
						);
					})}
				</StAccordionDetails>
			</StAccordion>
			<StyledLayout.FlexBox justifyContent="center" style={{ paddingTop: '40px' }} gap="8px">
				{query?.get('isReady') === null ? (
					<>
						<LargeBtn type="button" style={style.btnStyle.white_btn} onClick={handleTemporarySave}>
							임시저장
						</LargeBtn>
						<LargeBtn type="button" style={style.btnStyle.primary_btn_001} onClick={handleSaveItems}>
							입점신청
						</LargeBtn>
					</>
				) : (
					<LargeBtn
						type="button"
						style={style.btnStyle.primary_btn_002}
						onClick={() => changeModalKey(MODAL_KEY.ON_STORE_EDIT_COMPLETION_CONFIRM_MODAL)}
					>
						수정완료
					</LargeBtn>
				)}
			</StyledLayout.FlexBox>
			<Toast duration={2} open={temporarySaveToast} />
			{modalKey === MODAL_KEY.ON_STORE_PRODUCT_REQUIRED_WARNING_MODAL && (
				<StoreProductRequiredWarningModal onClick={() => changeModalKey(MODAL_KEY.OFF)} />
			)}
			{modalKey === MODAL_KEY.ON_STORE_PRODUCT_REQUIRED_SAVE_WARNING_MODAL && (
				<StoreProductRequiredSaveWarningModal onClick={() => changeModalKey(MODAL_KEY.OFF)} />
			)}
			{modalKey === MODAL_KEY.ON_STORE_REGISTRATION_CONFIRM_MODAL && (
				<StoreRegistrationConfirmModal onCancel={() => changeModalKey(MODAL_KEY.OFF)} onConfirm={submitData} />
			)}
			{modalKey === MODAL_KEY.ON_STORE_EDIT_COMPLETION_CONFIRM_MODAL && (
				<StoreEditCompletionConfirmModal onCancel={() => changeModalKey(MODAL_KEY.OFF)} onConfirm={submitEditItems} />
			)}
		</>
	);
};

const GuideWrapper = styled.div`
	width: 932px;
	height: 66px;
	border-radius: 12px;
	background-color: ${({ theme }) => theme.colors.gray_000};
	padding: 20px;
`;
const StAccordion = withStyles({
	root: {
		textAlign: 'center',
		width: '932px',
		minHeight: '72px',
		boxShadow: 'none',
		borderBottom: `1px solid ${theme.colors.gray_002}`,
		borderBottomRightRadius: 'none',
		borderBottomLeftRadius: 'none',
		display: 'flex',
		flexDirection: 'column',
		margin: 0,
		'&$expanded': {
			minHeight: '144px',
			margin: 0,
		},
		'&:before': {
			background: 'none',
		},
	},
})(Accordion);

const StAccordionSummary = withStyles({
	root: {
		margin: 0,
		minHeight: '72px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '26px 0',
		border: 'none',
		'&$expanded': {
			padding: 0,
		},
	},
	content: {
		margin: 0,
		'&$expanded': {
			margin: 0,
		},
	},
	expanded: {
		padding: '26px 0',
		margin: 0,
	},
})(AccordionSummary);

const StAccordionDetails = withStyles({
	root: {
		padding: 0,
		display: 'flex',
		flexDirection: 'column',
		gap: '16px',
		marginBottom: '24px',
	},
})(AccordionDetails);

export default Step3;

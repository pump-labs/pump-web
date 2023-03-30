'use client';

import { StoreRegistrationExitConfirmModal, TextField } from 'components/feature';
import { LargeBtn, PrivateRoute, StyledLayout, Typography } from 'components/shared';
import { useStep1Form } from 'core/useStep1Form';
import { MODAL_KEY } from 'store/actions/modalStore';
import { step1ErrorStore } from 'store/actions/step1Store';
import { theme } from 'styles';
import style from 'styles/style';

const Step1 = () => {
	const { name, email, phoneNumber, changeNormal, changeFormNormal } = step1ErrorStore();
	const {
		modalKey,
		changeModalKey,
		customPhoneNum,
		setCurrentKey,
		currentKey,
		setCustomPhoneNum,
		handleOnSubmit,
		handlePhoneNumber,
	} = useStep1Form();
	return (
		<>
			<form onSubmit={handleOnSubmit}>
				<StyledLayout.TextFieldSection>
					<label htmlFor="name">
						<Typography variant="h2" aggressive="body_oneline_004" color={theme.colors.gray_005}>
							대표자명
						</Typography>
					</label>
					<TextField
						id="name"
						name="step1"
						emptyErrorMessage="대표자명을 입력해주세요"
						onFocus={() => changeNormal('name')}
						inputFlag={name.isError}
						width="320px"
						value={name.value === '' ? undefined : name.value}
						placeholder="이름을 입력해주세요"
					/>
				</StyledLayout.TextFieldSection>
				<StyledLayout.TextFieldSection>
					<label htmlFor="email">
						<Typography variant="h2" aggressive="body_oneline_004" color={theme.colors.gray_005}>
							이메일
						</Typography>
					</label>
					<TextField
						emptyErrorMessage="이메일을 입력해주세요"
						formErrorMessage="이메일 형식을 확인해주세요"
						formFlag={email.formError}
						id="email"
						name="step1"
						onFocus={() => {
							changeNormal('email');
							if (email.formError) changeFormNormal();
						}}
						inputFlag={email.isError}
						width="320px"
						value={email.value === '' ? undefined : email.value}
						placeholder="예: pump@pump.com"
					/>
				</StyledLayout.TextFieldSection>
				<StyledLayout.TextFieldSection>
					<label htmlFor="phoneNumber">
						<Typography variant="h2" aggressive="body_oneline_004" color={theme.colors.gray_005}>
							전화번호
						</Typography>
					</label>
					<TextField
						emptyErrorMessage="전화번호를 입력해주세요"
						id="phoneNumber"
						name="step1"
						onFocus={() => changeNormal('phoneNumber')}
						inputFlag={phoneNumber.isError}
						width="320px"
						value={customPhoneNum}
						placeholder="‘-‘ 를 빼고 숫자만 입력해주세요"
						onChange={handlePhoneNumber}
						onKeyDown={(e) => setCurrentKey(e.key)}
					/>
				</StyledLayout.TextFieldSection>
				<StyledLayout.FlexBox justifyContent="center" style={{ paddingTop: '16px' }}>
					<LargeBtn style={style.btnStyle.primary_btn_002} type="submit">
						다음단계
					</LargeBtn>
				</StyledLayout.FlexBox>
			</form>
			{modalKey === MODAL_KEY.ON_STORE_REGISTRATION_EXIT_CONFIRM_MODAL && (
				<StoreRegistrationExitConfirmModal
					onCancel={() => changeModalKey(MODAL_KEY.OFF)}
					onConfirm={() => {
						window.opener = 'Self';
						window.open('', '_parent', '');
						window.close();
					}}
				/>
			)}
		</>
	);
};

export default PrivateRoute(Step1);

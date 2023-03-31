'use client';
import {
	BusinessLicenseTextField,
	DayOffBtn,
	PostcodePopupOpenBtn,
	RadioBtn,
	StoreEditCompletionConfirmModal,
	StoreImageBtn,
	StoreRegistrationStepChangeConfirmModal,
	StoreResistrationSmallBtn,
	TextField,
	TimePicker,
} from 'components/feature';
import { LargeBtn, StyledLayout, Typography } from 'components/shared';
import { businessHourDays } from 'core/storeRegistrationService';
import { useStep2Form } from 'core/useStep2Form';
import { useGetStore } from 'hooks/api/store/useGetStore';
import Image from 'next/image';
import { StoreDefaultImg } from 'public/static/images';
import { useEffect } from 'react';
import { MODAL_KEY } from 'store/actions/modalStore';
import { step2ErrorStore } from 'store/actions/step2Store';
import { theme } from 'styles';
import style from 'styles/style';

const Step2 = () => {
	const {
		submitEditInputs,
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
	} = useStep2Form();
	const { name, notice, basicAddress, addressDetail, instaAccount, callNumber } = step2ErrorStore();
	const { data } = useGetStore(query?.get('storeId'));
	useEffect(() => {
		setData(data);
	}, [data]);
	useEffect(() => {
		const newDayOff: boolean[] = [];
		newDayOff.push(false);
		if (businessHourValues.length > 0) {
			for (let i = 0; i < businessHourValues.length; i++) {
				if (businessHourValues[i].time === 'null') {
					newDayOff.push(true);
				} else newDayOff.push(false);
			}
			setDayOffStatus(newDayOff);
		}
	}, [businessHourValues]);

	return (
		<>
			<head>
				<meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
			</head>

			<form onSubmit={handleOnSubmit}>
				<StyledLayout.TextFieldSection>
					<label htmlFor="registrationNumber">
						<Typography variant="h2" aggressive="body_oneline_004" color={theme.colors.gray_005}>
							사업자번호
						</Typography>
					</label>
					<StyledLayout.FlexBox gap={'6px'}>
						<BusinessLicenseTextField
							businessLicenseTextFieldRef={businessLicenseInputRef}
							name="step2"
							id="registrationNumber"
							key={registrationNumber.value}
							value={registrationNumber.value}
							inputFlag={registrationNumber.isError}
							onFocus={() => setInputState('registrationNumber', 'normal')}
							placeholder="‘-‘ 를 빼고 숫자만 입력해주세요"
						/>
						<StoreResistrationSmallBtn type="button" width={{ width: '106px' }} onClick={handleBusinessLicenseStatusCheck}>
							번호 조회
						</StoreResistrationSmallBtn>
					</StyledLayout.FlexBox>
				</StyledLayout.TextFieldSection>
				<StyledLayout.TextFieldSection>
					<label htmlFor="name">
						<Typography variant="h2" aggressive="body_oneline_004" color={theme.colors.gray_005}>
							상호
						</Typography>
					</label>
					<TextField
						emptyErrorMessage="상호를 입력해주세요"
						name="step2"
						id="name"
						onFocus={() => setInputState('name', 'normal')}
						inputFlag={name.isError}
						width="320px"
						placeholder="상호명을 입력해주세요"
						defaultValue={name.value}
						key={name.value}
					/>
				</StyledLayout.TextFieldSection>
				<StyledLayout.TextFieldSection>
					<label htmlFor="callNumber">
						<Typography variant="h2" aggressive="body_oneline_004" color={theme.colors.gray_005}>
							매장 전화번호
						</Typography>
					</label>
					<TextField
						emptyErrorMessage="매장 전화번호를 입력해주세요"
						name="step2"
						id="callNumber"
						onFocus={() => setInputState('callNumber', 'normal')}
						inputFlag={callNumber.isError}
						width="320px"
						placeholder="‘-‘ 를 포함하여 입력해주세요"
						value={storeCallNumber}
						onChange={handleCallNumber}
					/>
				</StyledLayout.TextFieldSection>
				<StyledLayout.TextFieldSection>
					<label htmlFor="addressDetail">
						<Typography variant="h2" aggressive="body_oneline_004" color={theme.colors.gray_005}>
							매장 주소
						</Typography>
					</label>
					<StyledLayout.FlexBox gap="6px">
						<TextField
							emptyErrorMessage="매장 주소를 입력해주세요"
							readOnly={true}
							inputFlag={basicAddress.isError}
							name="step2"
							id="basicAddress"
							width="560px"
							placeholder="입력하기"
							value={storePostcodeInputs.address}
						/>
						<PostcodePopupOpenBtn onExtractedPostCode={handleExtractedPostCode} />
					</StyledLayout.FlexBox>
					<TextField
						emptyErrorMessage="상세 주소를 입력해주세요"
						onFocus={() => setInputState('addressDetail', 'normal')}
						inputFlag={addressDetail.isError}
						value={storePostcodeInputs.detailAddress}
						name="step2"
						id="addressDetail"
						placeholder="(필수) 상세주소를 입력해주세요"
						width="560px"
						onChange={handleStoreAddressDetailChange}
					/>
				</StyledLayout.TextFieldSection>
				<StyledLayout.TextFieldSection>
					<Typography variant="h2" aggressive="body_oneline_004" color={theme.colors.gray_005}>
						매장 사진
					</Typography>
					<StyledLayout.FlexBox style={{ paddingTop: '8px', paddingBottom: '12px' }}>
						<RadioBtn
							name="storeImage"
							value="defaultImage"
							onChange={handleSelectedStoreImageBtn}
							defaultChecked={imgPath.value[0] === ''}
						/>
						<StyledLayout.FlexBox style={{ paddingLeft: '8px' }} gap="8px" flexDirection="column">
							<label htmlFor="defaultImage">
								<Typography variant="h2" aggressive="button_001" color={theme.colors.gray_006}>
									기본 이미지 등록
								</Typography>
							</label>
							<Typography variant="p" aggressive="body_oneline_004" color={theme.colors.gray_005}>
								가게 사진이 없다면 기본 이미지로 등록해드려요
							</Typography>
							{selectedStoreImageBtn === 'defaultImage' && (
								<Image src={StoreDefaultImg} alt="기본가게이미지" width={343} height={160} style={{ paddingTop: '8px' }} />
							)}
						</StyledLayout.FlexBox>
					</StyledLayout.FlexBox>
					<StyledLayout.FlexBox>
						<RadioBtn
							onClick={() => setInputState('imgPath', 'normal')}
							name="storeImage"
							value="registerImage"
							onChange={handleSelectedStoreImageBtn}
							defaultChecked={imgPath.value[0] !== ''}
						/>
						<StyledLayout.FlexBox style={{ paddingLeft: '8px' }} gap="8px" flexDirection="column">
							<label htmlFor="registerImage">
								<Typography variant="h2" aggressive="button_001" color={theme.colors.gray_006}>
									직접 등록
								</Typography>
							</label>
							<Typography variant="p" aggressive="body_oneline_004" color={theme.colors.gray_005}>
								준비하신 이미지로 가게 사진을 등록해드려요
							</Typography>
							<StyledLayout.EmptyBoxDivider height="0" />
							{selectedStoreImageBtn === 'registerImage' && (
								<StoreImageBtn
									name="step2"
									id="imgPath"
									deleteImage={() => setClientStoreImageURL('')}
									onChange={handleUploadToClient}
									value={clientStoreImageURL}
									clientStoreImageURL={clientStoreImageURL}
									inputFlag={imgPath.isError}
								/>
							)}
						</StyledLayout.FlexBox>
					</StyledLayout.FlexBox>
				</StyledLayout.TextFieldSection>
				<StyledLayout.TextFieldSection>
					<label htmlFor="instaAccount">
						<Typography variant="h2" aggressive="body_oneline_004" color={theme.colors.gray_005}>
							홍보 채널 (선택)
						</Typography>
					</label>
					<TextField
						placeholder="링크를 입력해주세요"
						name="step2"
						key={instaAccount}
						defaultValue={instaAccount}
						id="instaAccount"
						inputFlag="normal"
						width="320px"
					/>
					<Typography variant="p" aggressive="body_oneline_004" color={theme.colors.gray_005}>
						인스타그램, 블로그, 홈페이지 중 가장 활발히 사용하고 있는 채널 하나를 선택해서 링크 입력해주세요
					</Typography>
				</StyledLayout.TextFieldSection>
				<StyledLayout.TextFieldSection>
					<Typography variant="h2" aggressive="body_oneline_004" color={theme.colors.gray_005}>
						운영 시간
					</Typography>
					<StyledLayout.FlexBox gap="24px" style={{ padding: '4px 0' }}>
						<StyledLayout.FlexBox gap="8px" alignItems="center">
							<RadioBtn
								name="businessHour"
								value="weekDaysWeekEnd"
								onClick={() => handleSelectedBusinessHourBtn('weekDaysWeekEnd')}
								defaultChecked={data === null || data === undefined}
							/>
							<label htmlFor="weekDaysWeekEnd">
								<Typography variant="h2" aggressive="button_001" color={theme.colors.gray_006}>
									평일 / 주말 달라요
								</Typography>
							</label>
						</StyledLayout.FlexBox>
						<StyledLayout.FlexBox gap="8px" alignItems="center">
							<RadioBtn
								name="businessHour"
								value="eachDays"
								onClick={() => handleSelectedBusinessHourBtn('eachDays')}
								defaultChecked={data !== null && data !== undefined}
							/>
							<label htmlFor="eachDays">
								<Typography variant="h2" aggressive="button_001" color={theme.colors.gray_006}>
									요일별로 달라요
								</Typography>
							</label>
						</StyledLayout.FlexBox>
					</StyledLayout.FlexBox>
					{selectedBusinessHourBtn === 'weekDaysWeekEnd' ? (
						<StyledLayout.FlexBox flexDirection="column" gap="12px">
							<StyledLayout.FlexBox>
								<StyledLayout.FlexBox flexDirection="column" gap="6px">
									<Typography variant="h3" aggressive="button_001" color={theme.colors.gray_007}>
										평일
									</Typography>
									<Typography variant="h4" aggressive="body_oneline_004" color={theme.colors.gray_005} margin="0 20px 0 0">
										(월~금)
									</Typography>
								</StyledLayout.FlexBox>
								<TimePicker dayOffRef={(el) => (dayOffRef.current[0] = el)} name="weekDays" />
							</StyledLayout.FlexBox>
							<StyledLayout.FlexBox>
								<StyledLayout.FlexBox flexDirection="column" gap="6px">
									<Typography variant="h3" aggressive="button_001" color={theme.colors.gray_007}>
										주말
									</Typography>
									<Typography variant="h4" aggressive="body_oneline_004" color={theme.colors.gray_005} margin="0 20px 0 0">
										(토~일)
									</Typography>
								</StyledLayout.FlexBox>
								<TimePicker dayOffRef={(el) => (dayOffRef.current[1] = el)} name="WeekEnd" disabled={dayOffStatus[0]} />
								<DayOffBtn dayOff={dayOffStatus[0]} onClick={() => handleTimePickerInput(0)} style={{ marginLeft: '6px' }} />
							</StyledLayout.FlexBox>
						</StyledLayout.FlexBox>
					) : (
						<StyledLayout.FlexBox flexDirection="column" gap="12px">
							{businessHourDays.map(({ id, day }, idx) => {
								return (
									<StyledLayout.FlexBox key={id} alignItems="center">
										<StyledLayout.FlexBox flexDirection="column" gap="6px">
											<Typography variant="h3" aggressive="button_001" color="gray_007" margin="0 20px 0 0">
												{day}
											</Typography>
										</StyledLayout.FlexBox>
										<TimePicker
											value={
												businessHourValues.length > 0
													? businessHourValues[idx].time !== 'null'
														? {
																startHour: businessHourValues[idx].time?.split('~')[0]?.substring(0, 2),
																startMinutes: businessHourValues[idx].time?.split('~')[0]?.substring(3, 5),
																endHour: businessHourValues[idx].time?.split('~')[1]?.substring(0, 2),
																endMinutes: businessHourValues[idx].time?.split('~')[1]?.substring(3, 5),
														  }
														: {
																startHour: '10',
																startMinutes: '00',
																endHour: '22',
																endMinutes: '00',
														  }
													: undefined
											}
											dayOffRef={(el) => (dayOffRef.current[id] = el)}
											disabled={dayOffStatus[id - 1]}
										/>
										<DayOffBtn
											dayOff={dayOffStatus[id - 1]}
											onClick={() => handleTimePickerInput(id - 1)}
											style={{ marginLeft: '6px' }}
										/>
									</StyledLayout.FlexBox>
								);
							})}
						</StyledLayout.FlexBox>
					)}
				</StyledLayout.TextFieldSection>
				<StyledLayout.TextFieldSection>
					<label htmlFor="notice">
						<Typography variant="h2" aggressive="body_oneline_004" color={theme.colors.gray_005}>
							휴무일
						</Typography>
					</label>
					<TextField
						emptyErrorMessage="휴무일을 입력해주세요"
						name="step2"
						id="notice"
						inputFlag={notice.isError}
						onFocus={() => setInputState('notice', 'normal')}
						width="320px"
						key={notice.value}
						defaultValue={notice.value}
						placeholder="휴무일을 자유롭게 입력해주세요"
					/>
					<StyledLayout.FlexBox style={{ paddingTop: '4px' }}>
						<Typography variant="p" aggressive="body_oneline_004" color={theme.colors.gray_005}>
							ex) 연중 무휴, 매주 토요일, 매달 둘째 및 넷째주 토요일 등
						</Typography>
					</StyledLayout.FlexBox>
				</StyledLayout.TextFieldSection>
				<StyledLayout.FlexBox justifyContent="center" style={{ paddingTop: '16px' }}>
					{query?.get('isReady') === null ? (
						<LargeBtn type="submit" style={style.btnStyle.primary_btn_002}>
							다음단계
						</LargeBtn>
					) : (
						<LargeBtn type="submit" style={style.btnStyle.primary_btn_002}>
							수정완료
						</LargeBtn>
					)}
				</StyledLayout.FlexBox>
			</form>
			{modalKey === MODAL_KEY.ON_STORE_REGISTRATION_STEP_CHANGE_CONFIRM_MODAL && (
				<StoreRegistrationStepChangeConfirmModal onCancel={() => changeModalKey(MODAL_KEY.OFF)} onConfirm={submitInputs} />
			)}
			{modalKey === MODAL_KEY.ON_STORE_EDIT_COMPLETION_CONFIRM_MODAL && (
				<StoreEditCompletionConfirmModal onCancel={() => changeModalKey(MODAL_KEY.OFF)} onConfirm={submitEditInputs} />
			)}
		</>
	);
};

export default Step2;

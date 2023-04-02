'use client';

import StoreRegistrationWarningInMobile from 'components/feature/Modal/StoreRegistrationWarningInMobile';
import { StyledLayout, Typography } from 'components/shared';
import { MotionShowBox } from 'components/shared/Motion';
import Image from 'next/image';
import Link from 'next/link';
import {
	AppStoreDownloadImg,
	LandingAdvantage001Img,
	LandingAdvantage002Img,
	LandingAppImg,
	LandingFeature001Img,
	LandingFeature002Img,
	LandingFeature003Img,
} from 'public/static/images';
import useModalStore, { MODAL_KEY } from 'store/actions/modalStore';
import styled, { CSSProperties } from 'styled-components';
import { theme } from 'styles';
import '../styles/globals.css';

const SERVICE_INTRODUCE_PDF_LINK = 'https://drive.google.com/file/d/1f40Y7fdPCTnH83JgiIMmdeFb_igRMUBP/view';
const SERVICE_APP_STORE_LINK = 'https://apps.apple.com/kr/app/pump/id1669869655';

const FEATURE_INTRO = [
	{
		id: 1,
		imageSrc: LandingFeature001Img,
		title: '주변 리필스테이션 추천',
		description: '사용자 위치에 기반해서\n가장 가까운 리필스테이션을 추천해요.',
	},
	{
		id: 2,
		imageSrc: LandingFeature002Img,
		title: '판매 상품 안내',
		description: '판매 중인 리필 상품의 종류를\n앱에서 미리 확인할 수 있어요.',
	},
	{
		id: 3,
		imageSrc: LandingFeature003Img,
		title: '리필스테이션 리뷰',
		description: '리뷰를 통해 리필 경험을\n공유할 수 있어요.',
	},
] as const;

const FEATURE_ADVANTAGE = [
	{
		id: 1,
		imageSrc: LandingAdvantage001Img,
		title: '마케팅 비용 없이\n홍보해요',
		description: '사용자 위치와 가장 가까운 리필스테이션을 추천하기에\n입점을 통해 자연스레 내 리필스테이션을 홍보할 수 있어요. ',
	},
	{
		id: 2,
		imageSrc: LandingAdvantage002Img,
		title: '판매 중인 리필 상품을\n손쉽게 안내해요',
		description: '인스타그램, 블로그와 같은 SNS에서 자주 받는\n판매 상품 문의를 하나의 플랫폼에서 해결해요.',
	},
] as const;

const FEATURE_FAQ = [
	{
		id: 1,
		title: '서비스는 앱에서만 제공되나요?',
		description:
			'손님용 서비스는 모바일 앱으로 제공되며, 매장 / 판매제품 정보를 직접 관리할 수 있는 사장님용 서비스는 웹으로 제공됩니다.',
	},
	{
		id: 2,
		title: '네이버 플레이스, 인스타그램과 같은 서비스보다 펌프를 사용하면 좋은 점은 무엇인가요?',
		description:
			'한 곳에서 매장 · 제품 정보를 관리할 수 있고, 더 자세하고 많은 정보를 손님들에게 제공할 수 있다는 점입니다. 향후에는 구매한 리필 제품에 대한 정보를 직접 기록할 수 있도록 하거나, 탄소중립포인트 적립을 도와주는 등 리필을 자주 하는 사람들을 위한 기능을 더 많이 개발할 계획입니다.',
	},
	{
		id: 3,
		title: '꼭 필요해보이는 기능을 제안하고 싶은데, 어떻게 전달할 수 있나요?',
		description: '아래 연락처 혹은 이메일로 연락부탁드립니다.\nTel. 010-2051-7330\nE-mail. bardchoi.pump@gmail.com',
	},
] as const;

const Root = () => {
	const modalKey = useModalStore((state) => state.modalKey);
	const changeModalKey = useModalStore((state) => state.changeModalKey);

	return (
		<StyledLayout.FlexBox flexDirection="column" alignItems="center">
			<StyledLayout.FlexBox
				className="w-full flex-col pt-[4.8rem]"
				background="linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #F9F9FB 100%)"
			>
				<StyledLayout.FlexBox className="px-[2rem]" flexDirection="column">
					<h2 className="mb-[1.2rem] text-center text-heading-multi-3">
						리필스테이션,
						<br />
						Pump에서 알리세요!
					</h2>

					<p className="mb-[2rem] text-center text-body-multi-4 text-gray-6">
						간편하게 가게 정보와 판매 상품을 등록하고
						<br />더 많은 사람에게 리필스테이션의 가치를 전해보세요.
					</p>

					<StyledLayout.FlexBox className="mx-auto flex-col gap-[0.6rem]">
						<StyledLinkBtn
							href={{
								pathname: '/registration/step1',
							}}
							className="hidden xl:!block"
							flex={1}
							border={`1px solid ${theme.colors.primary_010}`}
							borderradius={'8px'}
							backgroundcolor={theme.colors.primary_010}
							color={theme.colors.white}
							hoveropacity={'0.8'}
						>
							<Typography variant="span" aggressive="button_000">
								입점 신청
							</Typography>
						</StyledLinkBtn>

						<button
							className="min-w-[14rem] max-w-[14rem] rounded-lg bg-primary py-[1.3rem] text-button-1 text-white xl:!hidden"
							type="button"
							onClick={() => changeModalKey(MODAL_KEY.ON_STORE_REGISTRATION_WARNING_IN_MOBILE)}
						>
							입점 신청
						</button>

						<StyledLinkBtn
							className="max-w-[14rem] rounded-lg border py-[1.2rem]"
							href={{ pathname: SERVICE_INTRODUCE_PDF_LINK }}
							target={'_blank'}
							flex={1}
							border={`1px solid ${theme.colors.gray_002}`}
							backgroundcolor={theme.colors.white}
							hoverbackgroundcolor={theme.colors.gray_001}
							color={theme.colors.gray_006}
						>
							<span className="text-button-1 text-gray-6">서비스 소개서</span>
						</StyledLinkBtn>
						<StyledLinkBtn href={{ pathname: SERVICE_APP_STORE_LINK }} target={'_blank'} className="!hidden pc:!flex">
							<Image src={AppStoreDownloadImg} alt="app store" width={152} height={52} />
						</StyledLinkBtn>
					</StyledLayout.FlexBox>
				</StyledLayout.FlexBox>

				<StyledLayout.FlexBox className="flex justify-center">
					<MotionShowBox showDirection={'up'}>
						<Image src={LandingAppImg} alt="" width={440} height={504} loading="lazy" />
					</MotionShowBox>
				</StyledLayout.FlexBox>
			</StyledLayout.FlexBox>

			<StyledLayout.FlexBox className="flex-col px-[2rem]" flexDirection="column" width="996px" margin="64px 0 0 0">
				<h3 className="mb-[3.2rem] text-center text-heading-3 text-gray-7">앱 주요 기능</h3>

				<StyledLayout.FlexBox className="flex-col items-center gap-[3.2rem]">
					{FEATURE_INTRO.map((feature) => {
						const { id, imageSrc, title, description } = feature;
						return (
							<Card key={id}>
								<BackgroundBox
									className="mx-auto mb-[3.2rem]"
									alignItems={'center'}
									justifyContent={'center'}
									width="300px"
									height="300px"
									backgroundColor={theme.colors.gray_000}
								>
									<MotionShowBox showDirection={'up'} delay={id}>
										<Image src={imageSrc} alt={''} width={300} height={300} loading="lazy" />
									</MotionShowBox>
								</BackgroundBox>

								<h3 className="mb-[0.6rem] whitespace-pre-wrap text-center text-heading-4 text-gray-7">{title}</h3>
								<p className=" whitespace-pre-wrap text-center text-body-multi-4 text-gray-6">{description}</p>
							</Card>
						);
					})}
				</StyledLayout.FlexBox>
			</StyledLayout.FlexBox>

			<StyledLayout.FlexBox className="mt-[12.8rem] flex-col items-center gap-[3.2rem] px-[2rem]">
				<h3 className="text-center text-heading-3 text-gray-7">입점 기대효과</h3>

				{FEATURE_ADVANTAGE.map((advantage) => {
					const { id, imageSrc, title, description } = advantage;
					return (
						<StyledLayout.FlexBox key={id} className="flex-col">
							<BackgroundBox className="mb-[2rem] max-h-[18rem] max-w-[32rem] items-center justify-center bg-gray-0">
								<MotionShowBox showDirection={'up'} delay={id}>
									<Image src={imageSrc} alt={''} loading="lazy" />
								</MotionShowBox>
							</BackgroundBox>

							<StyledLayout.FlexBox className="flex-col items-center">
								<h4 className="mb-[0.6rem] text-center text-heading-4 text-gray-7">{title}</h4>
								<p className="whitespace-pre-wrap text-body-multi-4 text-gray-6">{description}</p>
							</StyledLayout.FlexBox>
						</StyledLayout.FlexBox>
					);
				})}
			</StyledLayout.FlexBox>

			<StyledLayout.FlexBox className="mt-[9.6rem] flex-col px-[2rem]">
				<h3 className="mb-[3.2rem] text-center text-heading-3 text-gray-7">FAQ</h3>

				<StyledLayout.FlexBox className="flex-col items-start gap-[3.2rem]">
					{FEATURE_FAQ.map((faq) => {
						const { id, title, description } = faq;
						return (
							<div key={id}>
								<h4 className="text-heading-multi-4 text-gray-7">{title}</h4>
								<div className="my-2 h-[1px] w-full bg-gray-2" />
								<p className="whitespace-pre-wrap text-body-multi-4 text-gray-6">{description}</p>
							</div>
						);
					})}
				</StyledLayout.FlexBox>
			</StyledLayout.FlexBox>

			<div className="mb-[4.8rem] mt-[4.0rem] flex w-full max-w-[99.6rem] px-[2rem] pc:mt-[9.6rem] pc:mb-[8.8rem]">
				<BackgroundBox
					alignItems="center"
					justifyContent="space-between"
					width="100%"
					padding="34px 48px"
					backgroundColor={theme.colors.primary_001}
					className="!justify-center !px-[2.4rem] !py-[2.4rem] pc:!justify-between pc:!py-[4.7rem] pc:!px-[4.8rem]"
				>
					<p className="hidden text-heading-6 text-primary xl:!block pc:text-heading-3">
						리필스테이션 홍보는 Pump에서 시작해보세요.
					</p>
					<p className="text-heading-6 text-primary xl:!hidden pc:text-heading-3">입점 신청은 PC에서 가능합니다.</p>

					<StyledLinkBtn
						href={{
							pathname: '/registration/step1',
						}}
						padding="16px 47px"
						border={`1px solid ${theme.colors.primary_010}`}
						borderradius={'8px'}
						backgroundcolor={theme.colors.primary_010}
						color={theme.colors.white}
						hoveropacity={'0.8'}
						className="!hidden pc:!block"
					>
						<span className="text-button-0">입점 신청</span>
					</StyledLinkBtn>
				</BackgroundBox>
			</div>

			<div className="w-full justify-center bg-gray-1 px-[2rem] py-[4.8rem] text-center pc:hidden">
				<h3 className="mb-[0.8rem] text-heading-multi-4 text-gray-7">
					Pump 서비스를
					<br />
					직접 사용해보고 싶으신가요 ?
				</h3>

				<p className="mb-[2rem] text-body-4 text-gray-6">애플 앱 스토어에서 다운받을 수 있어요.</p>

				<StyledLinkBtn href={{ pathname: SERVICE_APP_STORE_LINK }} target={'_blank'}>
					<Image src={AppStoreDownloadImg} alt="app store" width={152} height={52} />
				</StyledLinkBtn>
			</div>

			{modalKey === MODAL_KEY.ON_STORE_REGISTRATION_WARNING_IN_MOBILE && (
				<StoreRegistrationWarningInMobile onClick={() => changeModalKey(MODAL_KEY.OFF)} />
			)}
		</StyledLayout.FlexBox>
	);
};

export default Root;

type LinkBtnProps = {
	borderradius?: string;
	backgroundcolor?: string;
	hoveropacity?: string;
	hoverbackgroundcolor?: string;
} & CSSProperties;

const StyledLinkBtn = styled(Link)<LinkBtnProps>`
	flex: ${({ flex }) => flex};
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${({ padding }) => padding};
	border: ${({ border }) => border};
	border-radius: ${({ borderradius }) => borderradius};
	background-color: ${({ backgroundcolor }) => backgroundcolor};
	color: ${({ color }) => color};

	&:hover {
		background-color: ${({ hoverbackgroundcolor }) => hoverbackgroundcolor};
		opacity: ${({ hoveropacity }) => hoveropacity};
	}
`;

const Card = styled.div`
	flex: 1;
`;

const BackgroundBox = styled(StyledLayout.FlexBox)`
	position: relative;
	border-radius: 12px;
	background-color: ${({ backgroundColor }) => backgroundColor};
	object-fit: contain;
`;

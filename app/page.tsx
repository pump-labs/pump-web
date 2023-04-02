'use client';

import StoreRegistrationWarningInMobile from 'components/feature/Modal/StoreRegistrationWarningInMobile';
import { StyledLayout } from 'components/shared';
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
		<div className="flex flex-col items-center">
			<div
				className="mb-[4.8rem] flex w-full flex-col pt-[4.8rem] md:mb-[6.8rem]"
				style={{
					background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #F9F9FB 100%)',
				}}
			>
				<div className="flex flex-col px-[2rem]">
					<h2 className="mb-[1.2rem] text-center text-heading-multi-3 md:text-heading-multi-2">
						리필스테이션,
						<br />
						Pump에서 알리세요!
					</h2>

					<p className="mb-[2rem] text-center text-body-multi-4 text-gray-6 md:mb-[3.2rem] md:text-body-multi-1">
						간편하게 가게 정보와 판매 상품을 등록하고
						<br />더 많은 사람에게 리필스테이션의 가치를 전해보세요.
					</p>

					<div className="mx-auto flex flex-col gap-[0.6rem] md:flex-row">
						<Link
							className="hidden flex-1 rounded-lg border-primary bg-primary text-white hover:opacity-80 xl:!block"
							href={{
								pathname: '/registration/step1',
							}}
						>
							<span className="text-button-0">입점 신청</span>
						</Link>

						<button
							className="min-w-[14rem] rounded-lg bg-primary py-[1.3rem] text-button-1 text-white md:min-w-[15.2rem] xl:!hidden"
							type="button"
							onClick={() => changeModalKey(MODAL_KEY.ON_STORE_REGISTRATION_WARNING_IN_MOBILE)}
						>
							입점 신청
						</button>

						<Link
							className="flex min-w-[14rem] items-center justify-center rounded-lg border border-solid border-gray-2 bg-white py-[1.2rem] text-gray-6 hover:bg-gray-1 md:min-w-[15.2rem]"
							href={{ pathname: SERVICE_INTRODUCE_PDF_LINK }}
							target={'_blank'}
						>
							<span className="text-button-1 text-gray-6">서비스 소개서</span>
						</Link>

						<Link href={{ pathname: SERVICE_APP_STORE_LINK }} target={'_blank'} className="hidden md:block">
							<Image src={AppStoreDownloadImg} alt="app store" width={152} height={52} />
						</Link>
					</div>
				</div>

				<div className="flex justify-center">
					<MotionShowBox showDirection={'up'}>
						<Image src={LandingAppImg} alt="" width={440} height={504} loading="lazy" />
					</MotionShowBox>
				</div>
			</div>

			<div className="max-w-[99.6rem] flex-col px-[4rem] md:px-[5rem]">
				<h3 className="mb-[3.2rem] text-center text-heading-3 text-gray-7">앱 주요 기능</h3>

				<div className="flex max-w-[32rem] flex-col items-center gap-[3.2rem] md:max-w-full md:flex-row md:gap-[2.1rem]">
					{FEATURE_INTRO.map((feature) => {
						const { id, imageSrc, title, description } = feature;
						return (
							<div key={id} className="flex-1">
								<div className="relative mb-[3.2rem] flex w-full items-center justify-center rounded-[1.2rem] bg-gray-0 object-cover">
									<MotionShowBox showDirection={'up'} delay={id}>
										<Image src={imageSrc} alt={''} loading="lazy" />
									</MotionShowBox>
								</div>

								<h3 className="mb-[0.6rem] whitespace-pre-wrap text-center text-heading-4 text-gray-7">{title}</h3>
								<p className=" whitespace-pre-wrap text-center text-body-multi-4 text-gray-6">{description}</p>
							</div>
						);
					})}
				</div>
			</div>

			<div className="mt-[12.8rem] flex flex-col items-center px-[2rem] md:px-0">
				<h3 className="mb-[3.2rem] text-center text-heading-3 text-gray-7">입점 기대효과</h3>

				<div className="flex flex-col gap-[3.2rem] md:gap-[2.4rem]">
					{FEATURE_ADVANTAGE.map((advantage) => {
						const { id, imageSrc, title, description } = advantage;
						return (
							<div key={id} className="flex flex-col gap-y-[2rem] md:flex-row md:gap-y-0 md:gap-x-[2.4rem]">
								<div className="relative flex max-h-[18rem] max-w-[32rem] items-center justify-center rounded-[1.2rem] bg-gray-0 object-contain">
									<MotionShowBox showDirection={'up'} delay={id}>
										<Image src={imageSrc} alt={''} loading="lazy" />
									</MotionShowBox>
								</div>

								<div className="flex flex-col items-center md:items-start md:justify-center">
									<h4 className="mb-[0.6rem] text-center text-heading-4 text-gray-7">{title}</h4>
									<p className="whitespace-pre-wrap text-body-multi-4 text-gray-6">{description}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<StyledLayout.FlexBox className="mt-[9.6rem] max-w-[99.6rem] flex-col px-[2rem] md:px-[4.8rem]">
				<h3 className="mb-[3.2rem] text-center text-heading-3 text-gray-7">FAQ</h3>

				<StyledLayout.FlexBox className="flex-col items-start gap-[3.2rem]">
					{FEATURE_FAQ.map((faq) => {
						const { id, title, description } = faq;
						return (
							<div key={id} className="w-full">
								<h4 className="text-heading-multi-6 text-gray-7">{title}</h4>
								<div className="my-2 h-[1px] w-full bg-gray-2" />
								<p className="whitespace-pre-wrap text-body-multi-4 text-gray-6">{description}</p>
							</div>
						);
					})}
				</StyledLayout.FlexBox>
			</StyledLayout.FlexBox>

			<div className="mb-[4.8rem] mt-[4.0rem] flex w-full max-w-[99.6rem] px-[2rem] md:mt-[4.8rem] md:mb-[6.4rem] md:px-[4.8rem]">
				<div className="flex w-full items-center rounded-xl bg-orange-1 p-[2.4rem] md:justify-center md:p-[3.2rem] lg:justify-between">
					<p className="hidden text-heading-6 text-primary lg:!block pc:text-heading-3">
						리필스테이션 홍보는 Pump에서 시작해보세요.
					</p>
					<p className="mx-auto text-center text-heading-6 text-primary md:text-heading-4 lg:!hidden">
						입점 신청은 PC에서 가능합니다.
					</p>

					<Link
						className="hidden rounded-lg border border-solid border-primary bg-primary px-[4.7rem] py-[1.6rem] text-white hover:opacity-80 lg:!block"
						href={{
							pathname: '/registration/step1',
						}}
					>
						<span className="text-button-0">입점 신청</span>
					</Link>
				</div>
			</div>

			<div className="w-full justify-center bg-gray-1 px-[2rem] py-[4.8rem] text-center md:hidden pc:hidden">
				<h3 className="mb-[0.8rem] text-heading-multi-4 text-gray-7">
					Pump 서비스를
					<br />
					직접 사용해보고 싶으신가요 ?
				</h3>

				<p className="mb-[2rem] text-body-4 text-gray-6">애플 앱 스토어에서 다운받을 수 있어요.</p>

				<Link className="flex justify-center" href={{ pathname: SERVICE_APP_STORE_LINK }} target={'_blank'}>
					<Image src={AppStoreDownloadImg} alt="app store" width={152} height={52} />
				</Link>
			</div>

			{modalKey === MODAL_KEY.ON_STORE_REGISTRATION_WARNING_IN_MOBILE && (
				<StoreRegistrationWarningInMobile onClick={() => changeModalKey(MODAL_KEY.OFF)} />
			)}
		</div>
	);
};

export default Root;

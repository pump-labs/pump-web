import { InstagramIcon } from 'public/static/icons';
import React from 'react';
import * as S from './styled';

const REFERENCE_LINKS = {
	SERVICE_INTRODUCE: 'https://pumprefill.notion.site/pumprefill/Pump-8d0eb93581d640799030a34cbff082c0',
	SERVICE_TERMS: 'https://pumprefill.notion.site/4c15be8a033e4d5ba1f413712d2e4aff',
	SERVICE_POLICY: 'https://pumprefill.notion.site/d8dc6eba03a5432c98d618f03508aa24',
} as const;

const SOCIAL_LINKS = {
	INSTAGRAM: 'https://www.instagram.com/pump_refillactivater/',
};

const Footer = () => {
	return (
		<div className="flex min-h-[18rem] border-t border-solid border-gray-2 bg-gray-0">
			<div className="relative mx-auto w-full max-w-[99.6rem] px-[2rem]">
				<div className="relative flex w-full flex-col pt-[2.4rem]">
					<div className="mb-[1.4rem] flex h-full items-center">
						<S.Anchor href={{ pathname: REFERENCE_LINKS.SERVICE_INTRODUCE }} target="_blank" rel="noreferrer">
							<span className="text-body-4 text-gray-4 hover:text-primary">서비스 소개</span>
						</S.Anchor>

						<div className="mx-[0.8rem] h-[1.8rem] w-[0.1rem] bg-[#D9D9D9]" />
						<S.Anchor href={{ pathname: REFERENCE_LINKS.SERVICE_TERMS }} target="_blank" rel="noreferrer">
							<span className="text-body-4 text-gray-4 hover:text-primary">서비스 이용약관</span>
						</S.Anchor>

						<div className="mx-[0.8rem] h-[1.8rem] w-[0.1rem] bg-[#D9D9D9]" />
						<S.Anchor href={{ pathname: REFERENCE_LINKS.SERVICE_POLICY }} target="_blank" rel="noreferrer">
							<span className="text-tab-3 text-gray-4 hover:text-primary">개인정보 처리방침</span>
						</S.Anchor>
					</div>

					<p className="mb-[0.8rem] text-body-4 text-gray-4">bardchoi.pump@gmail.com</p>
					<p className="mb-[2.6rem] text-body-4 text-gray-4">Copyright 2023. Pump All rights reserved.</p>

					<S.Anchor href={{ pathname: SOCIAL_LINKS.INSTAGRAM }} target="_blank" rel="noreferrer">
						<InstagramIcon className="social" />
					</S.Anchor>
				</div>
			</div>
		</div>
	);
};

export default React.memo(Footer);

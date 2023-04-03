import { StyledLayout, Typography } from 'components/shared';
import Image from 'next/image';
import Link from 'next/link';
import { PumpLogo } from 'public/static/images';
import { memo } from 'react';
import useUserSessionStore from 'store/actions/userSessionStore';
import { theme } from 'styles';
import { removeUserTokenInLocalStorage } from 'utils/storage';
import * as S from './styled';

const Header = () => {
	const { userSession } = useUserSessionStore();

	const handleLogoutClick = () => {
		removeUserTokenInLocalStorage();
	};

	return (
		<S.Container>
			<StyledLayout.SubMaxContainer>
				<S.GlobalNavigation className="px-[1rem]">
					<S.LogoWrapper href={'/'} hrefLang={'ko'}>
						<Image src={PumpLogo} alt="Pump 로고 이미지" width={110} height={50} priority />
					</S.LogoWrapper>

					<StyledLayout.UnorderList gap={'40px'} className="!hidden lg:!flex">
						{!userSession?.id && (
							<S.NavigationItem>
								<StyledLayout.LinkWrapper
									href={{
										pathname: '/signin',
									}}
									replace
								>
									<Typography variant="h2" aggressive="button_001" color={theme.colors.gray_005}>
										로그인
									</Typography>
								</StyledLayout.LinkWrapper>
							</S.NavigationItem>
						)}

						{userSession?.id && (
							<>
								<S.NavigationItem>
									<StyledLayout.LinkWrapper
										href={{
											pathname: '/mypage/store',
										}}
									>
										<Typography variant="h2" aggressive="button_001" color={theme.colors.gray_005}>
											마이페이지
										</Typography>
									</StyledLayout.LinkWrapper>
								</S.NavigationItem>
								<S.NavigationItem>
									<Link
										href={{
											pathname: '/',
										}}
										target="_top"
										onClick={handleLogoutClick}
									>
										<Typography variant="h2" aggressive="button_001" color={theme.colors.gray_005}>
											로그아웃
										</Typography>
									</Link>
								</S.NavigationItem>
							</>
						)}
					</StyledLayout.UnorderList>
				</S.GlobalNavigation>
			</StyledLayout.SubMaxContainer>
		</S.Container>
	);
};

export default memo(Header);

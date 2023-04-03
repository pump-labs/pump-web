'use client';

import QueryProvider from 'app/Provider';
import { Footer, Header } from 'components/shared';
import { Provider } from 'jotai';
import ProtectedRouteWithAuthContainer from 'pageComponents/app/ProtectedRouteWithAuthContainer';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles';
import '../styles/globals.css';
import StyledComponentsRegistry from './RootStyleRegistry';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html>
			<head lang="ko">
				<title>Pump ㅣ 내 주변의 리필스테이션</title>
				<meta name="description" content="자연스럽게 리필 용기를 챙기는 날을 만드는 사람들" />
			</head>

			<body>
				<Provider>
					<QueryProvider>
						<StyledComponentsRegistry>
							<ThemeProvider theme={theme}>
								<div id="modal-portal" />

								<ProtectedRouteWithAuthContainer>
									<Header />
									<div className="relative mt-[7.8rem] min-h-[calc(100vh-25.8rem)]">{children}</div>
									<Footer />
								</ProtectedRouteWithAuthContainer>
							</ThemeProvider>
						</StyledComponentsRegistry>
					</QueryProvider>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;

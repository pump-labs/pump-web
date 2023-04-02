'use client';

import QueryProvider from 'app/Provider';
import { Footer, Header } from 'components/shared';
import { Provider } from 'jotai';
import ProtectedRouteWithAuthContainer from 'pageComponents/app/ProtectedRouteWithAuthContainer';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'styles';
import '../styles/globals.css';
import StyledComponentsRegistry from './RootStyleRegistry';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html>
			<head lang="ko" />
			<body>
				<Provider>
					<QueryProvider>
						<StyledComponentsRegistry>
							<ThemeProvider theme={theme}>
								<GlobalStyle />
								<div id="modal-portal" />

								<ProtectedRouteWithAuthContainer>
									<Header />
									<div className="relative mt-[7.8rem] h-[100vh-25.8rem]">{children}</div>
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

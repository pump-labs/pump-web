import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type OAuthResponse = {
	name: string | null;
	email: string;
	imgPath: string;
	type: string;
	oauthType: string; // KAKAO | NAVER
	oauthIdentity: string;
};

export type OAuthResponseStore = {
	oauthResponse: OAuthResponse;
	setOAuthResponse: (newOAuthResponse: OAuthResponse) => void;
};

const initialState: OAuthResponse = {
	name: '',
	email: '',
	imgPath: '',
	type: '',
	oauthType: '',
	oauthIdentity: '',
};

export const oauthResponseStore = (set) => ({
	oauthResponse: initialState,
	setOAuthResponse: (newOAuthResponse: OAuthResponse) => set(() => ({ oauthResponse: newOAuthResponse })),
});

const useOAuthResponseStore = create<OAuthResponseStore>()(
	process.env.NODE_ENV === 'production' ? oauthResponseStore : devtools(oauthResponseStore),
);

export default useOAuthResponseStore;

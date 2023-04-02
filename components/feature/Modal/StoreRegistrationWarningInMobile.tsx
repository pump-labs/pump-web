import { InfoModal } from 'components/feature/Modal';
import { InfoModalEvent } from 'components/feature/Modal/Common/InfoModal';

const StoreRegistrationWarningInMobile = ({ onClick }: InfoModalEvent) => {
	return (
		<InfoModal
			modalTitle="입점 신청은 PC 버전에서 가능합니다."
			modalDescription=""
			modalBtn={{ type: 'normal', text: '확인', onClick }}
		/>
	);
};

export default StoreRegistrationWarningInMobile;

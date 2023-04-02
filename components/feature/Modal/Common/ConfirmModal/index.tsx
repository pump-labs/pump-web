import { LargeBtn, ModalFrame, Typography } from 'components/shared';
import { ReactNode } from 'react';
import style from 'styles/style';

export type ConfirmModalEvent = {
	onCancel: () => void;
	onConfirm: () => void;
};

type Props = {
	modalTitle: ReactNode;
	modalDescription: ReactNode;
	modalBtn: {
		cancel: {
			text: string;
			onCancel: () => void;
		};
		confirm: {
			text: string;
			onConfirm: () => void;
		};
	};
};

const ConfirmModal = (props: Props) => {
	return (
		<ModalFrame>
			<h3 className="modal-title">
				<Typography variant="h3" aggressive={'headline_oneline_004'}>
					{props.modalTitle}
				</Typography>
			</h3>
			<p className="modal-description">
				<Typography variant="p" aggressive={'body_oneline_002'}>
					{props.modalDescription}
				</Typography>
			</p>

			<div className="mt-[3.2rem] flex max-h-[5rem] gap-[0.8rem]">
				<LargeBtn style={style.btnStyle.white_btn} onClick={props.modalBtn.cancel.onCancel}>
					{props.modalBtn.cancel.text}
				</LargeBtn>
				<LargeBtn style={style.btnStyle.black_btn} onClick={props.modalBtn.confirm.onConfirm}>
					{props.modalBtn.confirm.text}
				</LargeBtn>
			</div>
		</ModalFrame>
	);
};

export default ConfirmModal;

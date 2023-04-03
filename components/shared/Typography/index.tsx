import { PropsWithChildren } from 'react';
import * as S from './styled';

type Props = {
	className?: string;
	variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'caption' | 'span' | 'div';
	aggressive:
		| 'headline_oneline_001'
		| 'headline_oneline_002'
		| 'headline_oneline_003'
		| 'headline_oneline_004'
		| 'headline_oneline_005'
		| 'headline_multiline_001'
		| 'headline_multiline_002'
		| 'body_oneline_000'
		| 'body_oneline_001'
		| 'body_oneline_002'
		| 'body_oneline_003'
		| 'body_oneline_004'
		| 'body_oneline_005'
		| 'body_multiline_000'
		| 'body_multiline_001'
		| 'body_multiline_002'
		| 'body_multiline_003'
		| 'body_multiline_004'
		| 'body_multiline_005'
		| 'button_000'
		| 'button_001'
		| 'tab_001'
		| 'tab_002'
		| 'caption_large'
		| 'caption_medium'
		| 'caption_small';
	margin?: string;
	padding?: string;
	color?: string;
	lineHeight?: string;
	align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
	whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap';
} & PropsWithChildren;

const Typography = ({ className, children, variant, aggressive, ...props }: Props) => {
	return (
		<S.Component className={className} as={variant} aggressive={aggressive} {...props}>
			{children}
		</S.Component>
	);
};

export default Typography;

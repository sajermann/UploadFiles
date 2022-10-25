/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
	DetailedHTMLProps,
	HTMLAttributes,
	InputHTMLAttributes,
	LabelHTMLAttributes,
} from 'react';
import styles from './index.module.css';

interface Props
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	heading?: string;
	labelProps?: DetailedHTMLProps<
		LabelHTMLAttributes<HTMLLabelElement>,
		HTMLLabelElement
	>;
	containerProps?: React.DetailedHTMLProps<
		HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>;
}

export default function Input({
	heading,
	containerProps,
	labelProps,
	...rest
}: Props) {
	function classContainer() {
		if (containerProps?.className) {
			return `${styles.container} ${containerProps?.className}`;
		}
		return styles.container;
	}

	return (
		<div {...containerProps} className={classContainer()}>
			<label {...labelProps} className={styles.label}>
				{heading}
				<input {...rest} className={styles.input} />
			</label>
		</div>
	);
}

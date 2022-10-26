/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, useState } from 'react';

type Props = {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};
export function InputFile({ onChange }: Props) {
	const [file, setFile] = useState<File | null>(null);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { files } = e.target;
		if (files && files[0]) {
			setFile(files[0]);
		}
		if (onChange) {
			onChange(e);
		}
	}

	return (
		<>
			<label className="bg-green-700 text-white p-3 cursor-pointer w-60 hover:bg-green-900">
				Escolher arquivo
				<input
					accept=".pdf, .xml"
					type="file"
					className="hidden"
					onChange={handleChange}
				/>
			</label>
			Nome : {file?.name}
		</>
	);
}

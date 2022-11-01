/* eslint-disable jsx-a11y/label-has-associated-control */
import { CloudArrowUp } from 'phosphor-react';
import { ChangeEvent, useState } from 'react';
import { uploadService } from '../../Services/Upload';
import { InputFile } from '../InputFile';
import { Modal } from '../Modal';

export function Upload() {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [file, setFile] = useState<File | null>(null);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { files } = e.target;
		if (files && files[0]) {
			setFile(files[0]);
		}
	}

	async function handleSave() {
		console.log({ file });
		if (!file) {
			return;
		}
		const form = new FormData();
		form.append('uploadFile', file);
		const result = await uploadService.postUpload(form);
		console.log(result);
	}

	return (
		<>
			<button
				type="button"
				className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3"
				onClick={() => setIsOpenModal(prev => !prev)}
			>
				<CloudArrowUp size={24} />
				Upload File
			</button>
			<Modal
				isOpen={isOpenModal}
				onClose={() => setIsOpenModal(prev => !prev)}
				width="50%"
				closeButton
			>
				<h2>Selecione o arquivo para upload</h2>
				<form className="mt-2 flex flex-col gap-4">
					<InputFile onChange={handleChange} />
					<button type="button" onClick={handleSave}>
						Salvar
					</button>
				</form>
			</Modal>
		</>
	);
}

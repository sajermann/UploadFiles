import { MagnifyingGlassPlus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Modal } from '../Modal';

type Props = {
	children: JSX.Element;
	isOpen?: boolean;
	onClose: () => void;
	percentage?: number;
	disableBackdrop?: boolean;
	disableEsc?: boolean;
	disableClickOnBackdrop?: boolean;
	oneClickToClose?: boolean;
};

export function Upload() {
	const [name, setName] = useState('');
	const [isOpenModal, setIsOpenModal] = useState(false);

	return (
		<>
			<button
				type="button"
				className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3"
				onClick={() => setIsOpenModal(prev => !prev)}
			>
				<MagnifyingGlassPlus size={24} />
				Publicar anúncio
			</button>
			<Modal
				isOpen={isOpenModal}
				onClose={() => setIsOpenModal(prev => !prev)}
				width="69%"
			>
				<form
					className="mt-8 flex flex-col gap-4"
					onSubmit={() => console.log('submitdo')}
				>
					<input
						type="text"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					Upload de Fato
					{name}
				</form>
			</Modal>
		</>
	);
}

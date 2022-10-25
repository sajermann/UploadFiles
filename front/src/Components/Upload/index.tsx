import { MagnifyingGlassPlus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

type Props = {
	isOpen:
}

export function Upload() {
	const [name, setName] = useState('');

	return (
		<Dialog.Root open>
			<Dialog.Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
				<MagnifyingGlassPlus size={24} />
				Publicar anúncio
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-black/60 inset-0 fixed" />
				<Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
					<Dialog.Title className="text-3xl font-black">
						Publique um anúncio
					</Dialog.Title>

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
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

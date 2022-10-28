import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForMockTest } from '../../Hooks/UseForMockTest';
import { uploadService } from '../../Services/Upload';
import styles from './index.module.css';

export function ForMockTest() {
	const [name, setName] = useState('Valor Inicial');
	const [valueUpload, setValueUpload] = useState('Upload');
	const { umaFuncaoQualquer } = useForMockTest();
	const navigate = useNavigate();

	function handleNavigate() {
		navigate('/navegou');
	}

	async function handleUpload() {
		const result = await uploadService.postUpload();
		if (result) {
			setValueUpload('Sucesso Upload');
		} else {
			setValueUpload('Falha');
		}
	}

	return (
		<div className="flex gap-2">
			<button
				className={styles.button}
				type="button"
				data-testid="mockFuncHook"
				onClick={() => setName(umaFuncaoQualquer())}
			>
				{name}
			</button>

			<button
				className={styles.button}
				type="button"
				data-testid="mockRouterNavigate"
				onClick={handleNavigate}
			>
				Ir para Navegou
			</button>

			<button
				className={styles.button}
				type="button"
				data-testid="mockService"
				onClick={handleUpload}
			>
				{valueUpload}
			</button>
		</div>
	);
}

import React, { ChangeEvent, useState } from 'react';
import Input from '../../Components/Input';
import { useTranslation } from '../../Hooks/UseTranslation';
import { delay } from '../../Utils/Delay';
import { handleInput } from '../../Utils/HandleInput';
import styles from './index.module.css';

type Batata = {
	orderNumber: string;
	dateFrom: string;
	dateTo: string;
};

export default function Home() {
	const { translate } = useTranslation();
	const [newItem, setNewItem] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [filter, setFilter] = useState<Batata>({
		orderNumber: '',
		dateFrom: '',
		dateTo: '',
	});

	function handleSearch(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log({ filter });
	}

	return (
		<div className={styles.container}>
			<form onSubmit={handleSearch} className={styles.form}>
				<div className="flex flex-wrap">
					<Input
						id="orderNumber"
						value={filter.orderNumber}
						onChange={e => handleInput(e, filter, setFilter)}
						required
						heading="Nº Pedido"
						placeholder="123456"
						containerProps={{ className: 'w-full lg:w-[60vw] ' }}
					/>

					<Input
						value={filter.dateFrom}
						onChange={e => handleInput(e, filter, setFilter)}
						heading="Data Inicial"
						placeholder="__/__/___"
						containerProps={{ className: 'w-full lg:w-[200px] ' }}
					/>
					<Input
						id="dateTo"
						value={filter.dateTo}
						onChange={e => handleInput(e, filter, setFilter)}
						heading="Data Final"
						placeholder="__/__/___"
						containerProps={{ className: 'w-full lg:w-[200px] ' }}
					/>
				</div>

				<button
					type="submit"
					className={styles.buttonSubmit}
					disabled={isLoading}
				>
					{isLoading ? translate('ADDING...') : translate('ADD')}
				</button>
			</form>
		</div>
	);
}

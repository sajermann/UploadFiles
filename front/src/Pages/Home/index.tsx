/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { formatDateAndHour } from '@sajermann/utils/FormatDate';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.css';
// import 'react-data-grid/lib/styles.css';
import CustomTable from '../../Components/CustomTable';
import data from '../../Data/tags.json';

type Batata = {
	orderNumber: string;
	dateFrom: string;
	dateTo: string;
};

export default function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [selectedRows, setSelectedRows] = useState<object[]>([]);
	const navigate = useNavigate();

	function handleAddItem(id: string) {
		console.log('Add', id);
		const itemsForAdd = [...selectedRows];
		const itemForAdd = data.find(b => b.id === id);
		if (!itemForAdd) {
			return;
		}
		itemsForAdd.push(itemForAdd);
		setSelectedRows(itemsForAdd);
		setIsLoading(false);
	}

	function handleRemoveItem(id: string) {
		setSelectedRows(selectedRows.filter((b: any) => b.id !== id));
		setIsLoading(false);
	}

	function handleSelect(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
		setIsLoading(true);
		const { checked, dataset } = event.target as HTMLInputElement;
		if (checked && dataset.id) {
			handleAddItem(dataset.id);
			return;
		}
		if (dataset.id) {
			handleRemoveItem(dataset.id);
		}
	}

	const columns = [
		{
			field: 'id',
			header: 'Selecionar Linha',
			render: (id: string) => (
				<div className="flex items-center justify-center">
					<input
						defaultChecked={!!selectedRows.find((b: any) => b.id === id)}
						type="checkbox"
						className="accent-pink-500 h-6 w-6"
						data-id={id}
						onClick={handleSelect}
					/>
				</div>
			),
			options: {
				width: 50,
				maxWidth: 50,
			},
		},
		{
			field: 'product',
			header: 'Produto',
			render: null,
			options: {
				width: 150,
				align: 'left',
			},
		},
		{
			field: 'quantity',
			header: 'Quantidade',
			render: null,
			options: {
				width: 150,
			},
		},

		{
			field: 'date',
			header: 'Cadastrado',
			render: (createdAt: string) => (
				<div>{formatDateAndHour(new Date(createdAt))}</div>
			),

			options: {
				width: 120,
			},
		},
	];

	return (
		<div className={styles.customContainer}>
			<CustomTable
				isLoading={isLoading}
				data={data}
				columns={columns}
				itemsPerPage={50}
			/>
			<button onClick={() => navigate('/custom-react-table')}>
				Custom Table
			</button>
		</div>
	);
}

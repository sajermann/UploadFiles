/* eslint-disable react/no-unstable-nested-components */
import { useState, useMemo, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import styles from './index.module.css';
import { CustomReactTableV8 } from '../../Components/CustomReactTableV8';
import { makeData } from '../../Components/CustomReactTableV8/makeData';

type Person = {
	id: number;
	firstName: string;
	lastName: string;
	age: number;
	visits: number;
	progress: number;
	status: 'relationship' | 'complicated' | 'single';
	createdAt: Date;
};

export default function CustomReactTableV8Page() {
	const [isLoading, setIsLoading] = useState(false);
	const [rowSelection, setRowSelection] = useState({});
	const [data, setData] = useState(() => makeData(100));

	const columns = useMemo<ColumnDef<Person>[]>(
		() => [
			{
				accessorKey: 'id',
				header: 'ID',
				size: 60,
				align: 'center',
				minSize: 220,
				enableSorting: false,
				batata: () => console.log('Batata'),
			},
			{
				accessorKey: 'firstName',
				cell: info => info.getValue(),
				align: 'center',
			},
			{
				accessorFn: row => row.lastName,
				id: 'lastName',
				cell: info => info.getValue(),
				header: () => <span>Last Name</span>,
			},
			{
				accessorKey: 'age',
				header: () => 'Age',
				size: 50,
			},
			{
				accessorKey: 'visits',
				header: () => <span>Visits</span>,
				size: 600,
			},
			{
				accessorKey: 'status',
				header: 'Status',
			},
			{
				accessorKey: 'progress',
				header: 'Profile Progress',
				size: 80,
			},
			{
				accessorKey: 'createdAt',
				header: 'Created At',
				cell: info => info.getValue<Date>().toLocaleString(),
			},
		],
		[]
	);

	useEffect(() => console.log(rowSelection), [rowSelection]);

	return (
		<div className={styles.customContainer}>
			<CustomReactTableV8
				columns={columns}
				data={data}
				selection={{ type: 'single', rowSelection, setRowSelection }}
				// isLoading
			/>
		</div>
	);
}

import React from 'react';
import { useTable, useBlockLayout } from 'react-table';
import { FixedSizeList } from 'react-window';
import scrollbarWidth from './scrollbarWidth';
import styles from './index.module.css';
import { createRandomUser } from './makeData';

// const Styles = styled.div`
// 	padding: 1rem;

// 	.table {
// 		display: inline-block;
// 		border-spacing: 0;
// 		border: 1px solid black;

// 		.tr {
// 			:last-child {
// 				.td {
// 					border-bottom: 0;
// 				}
// 			}
// 		}

// 		.th,
// 		.td {
// 			margin: 0;
// 			padding: 0.5rem;
// 			border-bottom: 1px solid black;
// 			border-right: 1px solid black;

// 			:last-child {
// 				border-right: 1px solid black;
// 			}
// 		}
// 	}
// `;

export function CustomReactTable({ columns, data }: any) {
	// Use the state and functions returned from useTable to build your UI

	const defaultColumn = React.useMemo(
		() => ({
			width: 150,
		}),
		[]
	);

	const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		totalColumnsWidth,
		prepareRow,
	} = useTable(
		{
			columns,
			data,
			defaultColumn,
		},
		useBlockLayout
	);

	const RenderRow = React.useCallback(
		({ index, style }: any) => {
			const row = rows[index];
			prepareRow(row);
			return (
				<div
					{...row.getRowProps({
						style,
					})}
					className={styles.tr}
				>
					{row.cells.map(cell => (
						<div {...cell.getCellProps()} className={styles.td}>
							{cell.render('Cell')}
						</div>
					))}
				</div>
			);
		},
		[prepareRow, rows]
	);

	// Render the UI for your table
	return (
		<div {...getTableProps()} className={styles.table}>
			<div>
				{headerGroups.map(headerGroup => (
					<div {...headerGroup.getHeaderGroupProps()} className={styles.tr}>
						{headerGroup.headers.map(column => (
							<div {...column.getHeaderProps()} className={styles.th}>
								{column.render('Header')}
							</div>
						))}
					</div>
				))}
			</div>

			<div {...getTableBodyProps()}>
				<FixedSizeList
					className={styles.tbody}
					height={400}
					itemCount={rows.length}
					itemSize={35}
					width="100%"
				>
					{RenderRow}
				</FixedSizeList>
			</div>
		</div>
	);
}

function App() {
	const columns = React.useMemo(
		() => [
			{
				Header: 'Index',
				accessor: (row: any, i: any) => i,
				width: 50,
			},
			{
				Header: 'Avatar',
				// eslint-disable-next-line @typescript-eslint/no-explicit-any, react/no-unstable-nested-components
				accessor: ({ avatar }: any, i: any) => (
					<img src={avatar} alt={`Img-${i}`} className="w-5 rounded-full" />
				),
			},
			{
				Header: 'First Name',
				accessor: 'name',
			},
			{
				Header: 'Last Name',
				accessor: 'lastname',
				width: 600,
			},
			{
				Header: 'Email',
				accessor: 'email',
			},
		],
		[]
	);

	const data = React.useMemo(() => createRandomUser(100), []);
	console.log({ data });
	return (
		<div className={styles.customContainer}>
			{/* <div className={styles.tableWrap}> */}
			<CustomReactTable columns={columns} data={data} />
			{/* </div> */}
		</div>
	);
}

export default App;

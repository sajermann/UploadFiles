import React from 'react';
import {
	useTable,
	useResizeColumns,
	useFlexLayout,
	useRowSelect,
} from 'react-table';
import styles from './index.module.css';

const getStyles = (props, align = 'left') => [
	props,
	{
		style: {
			justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
			alignItems: 'flex-start',
			display: 'flex',
		},
	},
];

const headerProps = (props, { column }) => getStyles(props, column.align);

const cellProps = (props, { cell }) => getStyles(props, cell.column.align);

const IndeterminateCheckbox = React.forwardRef(
	({ indeterminate, ...rest }, ref) => {
		const defaultRef = React.useRef();
		const resolvedRef = ref || defaultRef;

		React.useEffect(() => {
			resolvedRef.current.indeterminate = indeterminate;
		}, [resolvedRef, indeterminate]);

		return <input type="checkbox" ref={resolvedRef} {...rest} />;
	}
);

function Table({ columns, data }) {
	const defaultColumn = React.useMemo(
		() => ({
			// When using the useFlexLayout:
			minWidth: 30, // minWidth is only used as a limit for resizing
			width: 150, // width is used for both the flex-basis and flex-grow
			maxWidth: 200, // maxWidth is only used as a limit for resizing
		}),
		[]
	);

	const { getTableProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data,
			defaultColumn,
		},
		useResizeColumns,
		useFlexLayout,
		useRowSelect,
		hooks => {
			hooks.allColumns.push(columns => [
				// Let's make a column for selection
				{
					id: 'selection',
					disableResizing: true,
					minWidth: 35,
					width: 35,
					maxWidth: 35,
					// The header can use the table's getToggleAllRowsSelectedProps method
					// to render a checkbox
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<div>
							<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
						</div>
					),
					// The cell can use the individual row's getToggleRowSelectedProps method
					// to the render a checkbox
					Cell: ({ row }) => (
						<div>
							<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
						</div>
					),
				},
				...columns,
			]);
			hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
				// fix the parent group of the selection button to not be resizable
				const selectionGroupHeader = headerGroups[0].headers[0];
				selectionGroupHeader.canResize = false;
			});
		}
	);

	return (
		<div {...getTableProps()} className={styles.table}>
			<div>
				{headerGroups.map(headerGroup => (
					<div
						{...headerGroup.getHeaderGroupProps({
							// style: { paddingRight: '15px' },
						})}
						className={styles.tr}
					>
						{headerGroup.headers.map(column => (
							<div
								{...column.getHeaderProps(headerProps)}
								className={styles.th}
							>
								{column.render('Header')}
								{/* Use column.getResizerProps to hook up the events correctly */}
								{column.canResize && (
									<div
										{...column.getResizerProps()}
										className={`${styles.resizer} ${
											column.isResizing ? styles.isResizing : ''
										}`}
									/>
								)}
							</div>
						))}
					</div>
				))}
			</div>
			<div className={styles.tbody}>
				{rows.map(row => {
					prepareRow(row);
					return (
						<div {...row.getRowProps()} className={styles.tr}>
							{row.cells.map(cell => (
								<div {...cell.getCellProps(cellProps)} className={styles.td}>
									{cell.render('Cell')}
								</div>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
}

function App() {
	const columns = React.useMemo(
		() => [
			{
				Header: 'First Name',
				accessor: 'firstName',
			},
			{
				Header: 'Last Name',
				accessor: 'lastName',
			},

			{
				Header: 'Age',
				accessor: 'age',
				width: 50,
				align: 'center',
			},
			{
				Header: 'Visits',
				accessor: 'visits',
				width: 50,
			},
			{
				Header: 'Status',
				accessor: 'status',
			},
			{
				Header: 'Profile Progress',
				accessor: 'progress',
				align: 'right',
			},
		],
		[]
	);

	const data = [
		{
			firstName: 'Bruno',
			lastName: 'Sajermann',
			age: 31,
			visits: '66',
			status: 'open',
			progress: '55%',
		},
		{
			firstName: 'Marcia',
			lastName: 'Sajermann',
			age: 51,
			visits: '16',
			status: 'closed',
			progress: '100%',
		},
	];

	return (
		<div className={styles.customContainer}>
			<Table columns={columns} data={data} />
		</div>
	);
}

export default App;

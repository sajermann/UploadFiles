/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { HTMLProps, useEffect, useRef } from 'react';
import './index.css';

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	OnChangeFn,
	Row,
	RowSelectionState,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';

type Props<T> = {
	selection?: {
		type: 'multi' | 'single';
		rowSelection: { [index: number]: boolean };
		setRowSelection: OnChangeFn<RowSelectionState>;
	};
	columns: ColumnDef<T>[];
	data: T[];
	isLoading?: boolean;
};

function IndeterminateCheckbox({
	indeterminate,
	className = '',
	...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
	const ref = useRef<HTMLInputElement>(null!);

	useEffect(() => {
		if (typeof indeterminate === 'boolean') {
			ref.current.indeterminate = !rest.checked && indeterminate;
		}
	}, [ref, indeterminate]);

	return (
		<input
			type="checkbox"
			ref={ref}
			className={`${className} cursor-pointer`}
			{...rest}
		/>
	);
}

export function CustomReactTableV8<T>({
	selection,
	columns,
	data,
	isLoading,
}: Props<T>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);

	function buildColumns() {
		if (selection) {
			const t = [
				{
					id: 'select',
					header: ({ table }: any) =>
						selection.type === 'multi' && (
							<IndeterminateCheckbox
								{...{
									checked: table.getIsAllRowsSelected(),
									indeterminate: table.getIsSomeRowsSelected(),
									onChange: table.getToggleAllRowsSelectedHandler(),
								}}
							/>
						),

					size: 60,
					minSize: 60,
					maxSize: 60,
					align: 'center',
					enableSorting: false,
					cell: ({ row }: any) => (
						<div className="px-1">
							<IndeterminateCheckbox
								{...{
									checked: row.getIsSelected(),
									indeterminate: row.getIsSomeSelected(),
								}}
							/>
						</div>
					),
				},
			];
			return [...t, ...columns];
		}
		return columns;
	}

	const table = useReactTable({
		data,
		columns: buildColumns(),
		columnResizeMode: 'onChange',
		state: {
			sorting,
			rowSelection: selection?.rowSelection,
		},
		onRowSelectionChange: selection?.setRowSelection,
		enableRowSelection: selection !== undefined,
		enableMultiRowSelection: selection?.type === 'multi',
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true,
	});

	function verifyIsSelected(row: Row<T>) {
		try {
			if (row.getIsSelected()) {
				return 'active';
			}
			return '';
		} catch {
			return '';
		}
	}

	const tableContainerRef = React.useRef<HTMLDivElement>(null);

	const { rows } = table.getRowModel();
	const rowVirtualizer = useVirtual({
		parentRef: tableContainerRef,
		size: rows.length,
		overscan: 10,
	});
	const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

	const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
	const paddingBottom =
		virtualRows.length > 0
			? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
			: 0;

	return (
		<div className="p-2">
			{isLoading && (
				<div
					style={{
						// backgroundColor: 'rgba(0,0,0,0.1)',
						height: '55%',
						position: 'absolute',
						width: '97.78%',
						top: '90px',
						zIndex: 1,
					}}
				>
					<div
						style={{
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						Carregando...
					</div>
				</div>
			)}
			<div className="h-2" />
			<div ref={tableContainerRef} className="customContainer">
				<table>
					<thead>
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<th
										key={header.id}
										colSpan={header.colSpan}
										style={{
											width: header.getSize(),
											// @ts-expect-error dasddas
											textAlign: header.getContext().column.columnDef.align,
										}}
									>
										{header.isPlaceholder ? null : (
											<>
												<div
													{...{
														className: header.column.getCanSort()
															? 'cursor-pointer select-none'
															: '',
														onClick: header.column.getToggleSortingHandler(),
													}}
												>
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
													{{
														asc: ' 🔼',
														desc: ' 🔽',
													}[header.column.getIsSorted() as string] ?? null}
												</div>
												{/* SizingMode */}
												<div
													{...{
														onMouseDown: header.getResizeHandler(),
														onTouchStart: header.getResizeHandler(),
														className: `resizer ${
															header.column.getIsResizing() ? 'isResizing' : ''
														}`,
													}}
												/>
											</>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody style={{ opacity: isLoading ? 0.5 : 1 }}>
						{data.length === 0 && !isLoading && (
							<tr style={{ height: '100%' }}>
								<td
									colSpan={Object.keys(columns).length}
									style={{ border: '1px solid', textAlign: 'center' }}
								>
									Sem Dados
								</td>
							</tr>
						)}

						{paddingTop > 0 && (
							<tr>
								<td style={{ height: `${paddingTop}px` }} />
							</tr>
						)}
						{virtualRows.map(virtualRow => {
							const row = rows[virtualRow.index] as Row<T>;
							return (
								<tr
									key={row.id}
									className={verifyIsSelected(row)}
									onClick={() => row.toggleSelected()}
								>
									{row.getVisibleCells().map(cell => (
										<td
											key={cell.id}
											// @ts-expect-error dasddas
											style={{ textAlign: cell.column.columnDef.align }}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									))}
								</tr>
							);
						})}
						{paddingBottom > 0 && (
							<tr>
								<td style={{ height: `${paddingBottom}px` }} />
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<div>{table.getRowModel().rows.length} Rows</div>
		</div>
	);
}

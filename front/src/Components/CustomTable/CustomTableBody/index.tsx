/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/no-unstable-nested-components */
import { memo, useEffect, useState } from 'react';
import useWindowDimensions from '../../../Hooks/UseWindowDimensions';
import { generateNumbers } from '../../../Utils/Random';
import './index.css';

type Props = {
	data: any[];
	columns: any[];
	isLoading: boolean;
	itemsPerPage: number;
};

export default function CustomTableBody({
	data,
	columns,
	isLoading,
	itemsPerPage,
}: Props) {
	const [leftOverSize, setLeftOverSize] = useState(0);
	const { widthScreen } = useWindowDimensions();

	useEffect(() => {
		// Soma todos os widths que vem no array columns
		const sizeAllColumns = columns.reduce((total, x) => {
			if (typeof total === 'object')
				return total.options.width + x.options.width;
			return total + x.options.width;
		});

		// Se a soma das colunas forem maior que o tamanho da tela, seta o
		// Valor sobrando para 0;
		if (sizeAllColumns > widthScreen) {
			setLeftOverSize(0);
			return;
		}

		// Caso não seja, pega o tamanho da tela menos o tamanho de todas as
		// Colunas menos um tanto de respiro e divide pela quantidade de colunas
		// Que essa tabela terá para que seja distribuída posteriormente e não fique
		// Com espaços vagos nas laterais
		setLeftOverSize((widthScreen - sizeAllColumns - 46) / columns.length);
	}, [widthScreen]);

	const Skeletun = memo(() => {
		const quantityRows: number[] = [];

		for (let i = 0; i < itemsPerPage; i += 1) {
			quantityRows.push(i);
		}
		return (
			<>
				{quantityRows.map(() => (
					<tr key={generateNumbers(5)} className="h-12 py-0 px-4">
						{columns.map(column => (
							<td
								key={generateNumbers(5)}
								style={{
									overflow: 'hidden',
									minWidth: column.options.width + leftOverSize,
									maxWidth: column.options.width + leftOverSize,
									width: column.options.width + leftOverSize,
								}}
							>
								<div>skeleton</div>
							</td>
						))}
					</tr>
				))}
			</>
		);
	});

	return (
		<div className="pt-0">
			<div
				className="h-[52vh] w-[100%] relative overflow-auto my-4 border-2"
				style={{ scrollSnapType: 'x mandatory' }}
			>
				<div className="flex flex-nowrap">
					<table
						id="resizeMe"
						className="customTable"
						data-testid="customTable-table"
						style={{ borderCollapse: 'collapse' }}
					>
						<thead data-testid="customTable-thead">
							<tr data-testid="customTable-tr">
								{columns.map((column, i) => (
									<th
										id={`column-${i}`}
										data-testid="customTable-th"
										key={generateNumbers(5)}
										className="h-14 sticky top-0 px-1 border z-[1] bg-gray-900 font-bold text-white"
										onClick={() => console.log('Clique Header', { column })}
										style={{
											...column.options.thStyle,
											overflow: 'hidden',
											minWidth: column.options.width + leftOverSize,
											maxWidth: column.options.width + leftOverSize,
											width: column.options.width + leftOverSize,
											textAlign: column.options.align || 'center',
										}}
									>
										{column.header}
									</th>
								))}
							</tr>
						</thead>
						<tbody data-testid="customTable-tbody">
							{isLoading && <Skeletun />}
							{data.map(itemData => (
								<tr
									data-testid="customTable-tr"
									key={generateNumbers(5)}
									className="h-12 py-0 px-1 overflow-hidden"
									onClick={() => console.log(itemData)}
								>
									{columns.map(column => (
										<td
											className="border"
											data-testid="customTable-td"
											key={generateNumbers(5)}
											style={{
												...column.options.tdStyle,
												minWidth: column.options.width + leftOverSize,
												maxWidth: column.options.width + leftOverSize,
												width: column.options.width + leftOverSize,
												// textAlign: column.options.align || 'center',
											}}
										>
											{column.render &&
												(itemData[column.field]
													? column.render(itemData[column.field])
													: column.render(itemData))}
											{!column.render && (
												<div
													style={{
														textAlign: column.options.align || 'center',
													}}
												>
													{itemData[column.field]}
												</div>
											)}
										</td>
									))}
								</tr>
							))}
							{data.length === 0 && !isLoading && (
								<tr
									data-testid="customTable-tr"
									className="w-[98vw] font-black text-5xl"
								>
									<td data-testid="customTable-td" colSpan={columns.length}>
										{' '}
										Sem resultados
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

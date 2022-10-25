import { ChangeEvent } from 'react';

export function handleInput<T>(
	e: ChangeEvent<HTMLInputElement>,
	data: T,
	setData: (newData: T) => void
) {
	const { value, id } = e.target;
	if (id === '' || !id) {
		return;
	}
	const prev = { ...data } as { [index: string]: string };
	prev[id] = value;
	setData(prev as T);
}

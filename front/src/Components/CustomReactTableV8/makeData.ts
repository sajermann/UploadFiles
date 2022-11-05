/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker/locale/pt_BR';

export type Person = {
	id: number;
	firstName: string;
	lastName: string;
	age: number;
	visits: number;
	progress: number;
	status: 'relationship' | 'complicated' | 'single';
	createdAt: Date;
};

const range = (len: number) => {
	const arr = [];
	for (let i = 0; i < len; i += 1) {
		arr.push(i);
	}
	return arr;
};

const newPerson = (index: number): Person => ({
	id: index + 1,
	firstName: faker.name.firstName(),
	lastName: faker.name.lastName(),
	age: faker.datatype.number(40),
	visits: faker.datatype.number(1000),
	progress: faker.datatype.number(100),
	createdAt: faker.datatype.datetime({ max: new Date().getTime() }),
	status: faker.helpers.shuffle<Person['status']>([
		'relationship',
		'complicated',
		'single',
	])[0]!,
});

export function makeData(...lens: number[]) {
	const makeDataLevel = (depth = 0): Person[] => {
		const len = lens[depth]!;
		return range(len).map(
			(d): Person => ({
				...newPerson(d),
			})
		);
	};

	return makeDataLevel();
}

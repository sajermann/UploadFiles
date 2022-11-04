// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker/locale/pt_BR';
import { TUser } from '../../Types/TUser';

export function createRandomUser(quantity: number): TUser[] {
	const USERS: TUser[] = [];

	for (let i = 0; i < quantity; i += 1) {
		USERS.push({
			id: faker.datatype.uuid(),
			name: faker.name.firstName(),
			lastname: faker.name.lastName(),
			email: faker.internet.email(),
			avatar: faker.image.avatar(),
			createdAt: faker.date.past().toISOString(),
			expirationAt: faker.date.future().toISOString(),
		});
	}

	return USERS;
}

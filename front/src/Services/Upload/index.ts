import api from '../api';

const baseUrl = '/upload';

async function postUpload(file?: FormData): Promise<boolean> {
	try {
		const { data } = await api.post(`${baseUrl}/batata`, file);
		return data;
	} catch (e) {
		console.log({ e });
		return false;
	}
}

export const uploadService = { postUpload };

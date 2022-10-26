import {
	AxiosResponse,
	AxiosError,
	AxiosRequestConfig,
	AxiosInstance,
} from 'axios';

const TIMEZONE = new Date().toTimeString().split(' ')[1] || '';

export default function Interceptor(api: AxiosInstance) {
	api.interceptors.response.use(
		(response: AxiosResponse) => response,
		async (error: AxiosError) => {
			// if (!error.response) {
			// 	const customMessage = {
			// 		title: 'Network Error',
			// 		message: 'Unable to connect to our servers, no internet connection',
			// 	};

			// 	return Message({ error, customMessage });
			// }
			if (
				error.response?.status === 412 ||
				error.response?.headers['content-type'] === 'text/csv'
			) {
				return Promise.resolve({
					status: error.response.status,
					data: error.response.data,
				});
			}

			if (error.response?.status === 401) {
				// KeycloakService.loginKeycloak();
				// return null;
			}

			if (error.response?.status === 404) {
				return error.response;
			}

			if (error.response?.status === 400) {
				return error.response;
			}

			if (error.response?.status) {
				// return Message({ error, isStatus: true });
			}

			console.info(error.config);
			return Promise.reject(error);
		}
	);

	const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
		console.info(`[request] [${JSON.stringify(config)}]`);
		const { headers } = config;
		// eslint-disable-next-line no-param-reassign
		config.headers = {
			...headers,
			Timezone: new Date().toTimeString().split(' ')[1] || '',
			Authorization: `Bearer `,
		};

		return config;
	};

	const onRequestError = (error: AxiosError): Promise<AxiosError> => {
		console.error(`[request error] [${JSON.stringify(error)}]`);
		return Promise.reject(error);
	};

	api.interceptors.request.use(onRequest, onRequestError);
}

/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import Interceptor from './interceptor';

const baseURL =
	import.meta.env.NODE_ENV === 'development'
		? import.meta.env.VITE_URL_API_DEVELOPMENT
		: import.meta.env.VITE_URL_API_PRODUCTION;

const headers = {
	'Access-Control-Origin': '*',
	'Content-Type': 'application/json;charset=utf-8',
	'Access-Control-Allow-Method': 'POST,GET,DELETE',
};

const api = axios.create({
	baseURL,
	headers,
});

if (import.meta.env.NODE_ENV !== 'test') {
	api.defaults.timeout = 1000 * 60 * 10; // (Ms * Sec * Min = 10 Minutes)
	Interceptor(api);
}

export default api;

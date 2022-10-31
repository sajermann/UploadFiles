/**
 * @vitest-environment jsdom
 */
import { it, describe, expect } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { uploadService } from '.';
import api from '../api';

const apiMock = new MockAdapter(api);
const baseUrl = '/upload';

describe.only('Pages/ForMockTest', () => {
	it(`should mock method umaFuncaoQualquer`, async () => {
		apiMock.onAny(`${baseUrl}/batata`).replyOnce(200, { data: 'test' });
		console.log('Antes req');
		const t = await uploadService.postUpload();
		console.log('Depois resp');
		expect(JSON.stringify(t)).toBe(JSON.stringify({ data: 'test' }));
		console.log('Depois expect');
	});
});

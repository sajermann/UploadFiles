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

		const t = await uploadService.postUpload();
		expect(JSON.stringify(t)).toBe(JSON.stringify({ data: 'test' }));
	});
});

/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from '@testing-library/react';
import { it, describe, expect, vi } from 'vitest';
import { InputFile } from './index';

describe('Components/Modal', () => {
	it(`should open modal`, async () => {
		const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
		const { getByTestId } = render(<InputFile onChange={console.log} />);
		const input = getByTestId('input');
		expect(input).toBeInTheDocument();
		await fireEvent.change(input, { target: { files: [file] } });
	});
});

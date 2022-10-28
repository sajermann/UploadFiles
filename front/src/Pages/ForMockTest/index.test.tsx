/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from '@testing-library/react';
import { it, describe, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ForMockTest } from './index';
import { ForMockTestProvider } from '../../Hooks/UseForMockTest';
import { uploadService } from '../../Services/Upload';

vi.mock('../../Hooks/UseForMockTest', async () => {
	const mod = await vi.importActual<any>('../../Hooks/UseForMockTest');
	return {
		...mod,
		useForMockTest: () => ({
			umaFuncaoQualquer: () => 'Essa função está mocada',
		}),
	};
});
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
	const mod = await vi.importActual<any>('react-router-dom');
	return {
		...mod,
		useNavigate: () => mockNavigate,
	};
});

function Mock() {
	return (
		<BrowserRouter>
			<ForMockTestProvider>
				<ForMockTest />
			</ForMockTestProvider>
		</BrowserRouter>
	);
}

describe('Pages/ForMockTest', () => {
	it(`should mock method umaFuncaoQualquer`, async () => {
		const { getByTestId, getByText } = render(<Mock />);
		fireEvent.click(getByTestId('mockFuncHook'));
		await waitFor(() => {
			expect(getByText('Essa função está mocada')).toBeInTheDocument();
		});
	});

	it(`should spy on navigate`, async () => {
		const { getByTestId } = render(<Mock />);
		fireEvent.click(getByTestId('mockRouterNavigate'));
		await waitFor(() => {
			expect(mockNavigate).toBeCalledWith('/navegou');
		});
	});

	it(`should mock service`, async () => {
		vi.spyOn(uploadService, 'postUpload').mockResolvedValue(true);
		const { getByTestId, getByText } = render(<Mock />);
		fireEvent.click(getByTestId('mockService'));
		await waitFor(() => {
			expect(getByText('Sucesso Upload')).toBeInTheDocument();
		});
	});
});

import { Route, Routes } from 'react-router-dom';
import App from '../../Components/CustomReactTable';
import { ForMockTest } from '../ForMockTest';
import Home from '../Home';

export default function RoutesConfig() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/test" element={<ForMockTest />} />
			<Route path="/custom-react-table" element={<App />} />
		</Routes>
	);
}

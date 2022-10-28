import { Route, Routes } from 'react-router-dom';
import { ForMockTest } from '../ForMockTest';
import Home from '../Home';

export default function RoutesConfig() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/test" element={<ForMockTest />} />
		</Routes>
	);
}

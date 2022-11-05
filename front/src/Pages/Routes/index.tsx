import { Route, Routes } from 'react-router-dom';
import App from '../../Components/CustomReactTable';
import CustomReactTableV8Page from '../CustomReactTableV8';
import { ForMockTest } from '../ForMockTest';
import Home from '../Home';

export default function RoutesConfig() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/test" element={<ForMockTest />} />
			<Route path="/custom-react-table" element={<App />} />
			<Route
				path="/custom-react-table-v8"
				element={<CustomReactTableV8Page />}
			/>
		</Routes>
	);
}

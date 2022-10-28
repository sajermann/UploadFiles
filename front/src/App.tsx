import { BrowserRouter } from 'react-router-dom';
import Routes from './Pages/Routes';
import { Header } from './Components/Header';
import { DarkModeProvider } from './Hooks/UseDarkMode';
import { ForMockTestProvider } from './Hooks/UseForMockTest';

function App() {
	return (
		<BrowserRouter>
			<DarkModeProvider>
				<ForMockTestProvider>
					<Header />
					<Routes />
				</ForMockTestProvider>
			</DarkModeProvider>
		</BrowserRouter>
	);
}

export default App;

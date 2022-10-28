import { createContext, useContext, ReactNode, useMemo } from 'react';

type DarkModeContextType = {
	umaFuncaoQualquer: () => string;
};

const darkModeContextDefaultValues: DarkModeContextType =
	{} as DarkModeContextType;

const TestContext = createContext<DarkModeContextType>(
	darkModeContextDefaultValues
);

export function useForMockTest() {
	return useContext(TestContext);
}

type Props = {
	children: ReactNode;
};

export function ForMockTestProvider({ children }: Props) {
	function umaFuncaoQualquer() {
		return 'Essa função veio do Hook';
	}

	const memoizedValue = useMemo(
		() => ({
			umaFuncaoQualquer,
		}),
		[]
	);

	return (
		<TestContext.Provider value={memoizedValue}>
			{children}
		</TestContext.Provider>
	);
}

import { useState } from 'react';
import styles from './index.module.css';
import 'react-data-grid/lib/styles.css';
import data from '../../Data/tags.json';
import App from '../../Components/DataTable';

export default function CustomReactTable() {
	const [isLoading, setIsLoading] = useState(false);
	const [selectedRows, setSelectedRows] = useState<object[]>([]);

	return (
		<div className={styles.customContainer}>
			<App />
		</div>
	);
}

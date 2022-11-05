import { useState } from 'react';
import styles from './index.module.css';
import 'react-data-grid/lib/styles.css';
import data from '../../Data/tags.json';
import { CustomReactTableV8 } from '../../Components/CustomReactTableV8';

export default function CustomReactTableV8Page() {
	const [isLoading, setIsLoading] = useState(false);
	const [selectedRows, setSelectedRows] = useState<object[]>([]);

	return (
		<div className={styles.customContainer}>
			<CustomReactTableV8 />
		</div>
	);
}

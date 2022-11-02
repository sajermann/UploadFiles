import React, { useState } from 'react';

import { useTranslation } from '../../Hooks/UseTranslation';

import styles from './index.module.css';
import 'react-data-grid/lib/styles.css';
import Table from '../../Components/DataTable';

type Batata = {
	orderNumber: string;
	dateFrom: string;
	dateTo: string;
};

export default function Home() {
	return (
		<div className={styles.customContainer}>
			<Table />
		</div>
	);
}

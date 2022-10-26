import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import styles from './index.module.css';

type Props = {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	width?: string;
	closeByBackdrop?: boolean;
	closeByEsc?: boolean;
	contentProps?: object;
	overlayProps?: object;
	closeButton?: boolean;
};

export function Modal({
	children,
	isOpen,
	onClose,
	closeByBackdrop,
	closeByEsc,
	width,
	contentProps,
	overlayProps,
	closeButton,
}: Props) {
	return (
		<Dialog.Root open={isOpen}>
			<Dialog.Portal>
				<Dialog.Overlay
					{...overlayProps}
					className={styles.overlay}
					onClick={closeByBackdrop ? onClose : undefined}
				/>
				<Dialog.Content
					{...contentProps}
					style={{ width }}
					onEscapeKeyDown={closeByEsc ? onClose : undefined}
					className={styles.content}
				>
					{closeButton && (
						<button
							type="button"
							className={styles.closeButton}
							onClick={onClose}
						>
							<X size={32} />
						</button>
					)}
					{children}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

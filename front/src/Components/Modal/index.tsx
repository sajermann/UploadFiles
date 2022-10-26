import * as Dialog from '@radix-ui/react-dialog';
import styles from './index.module.css';

type Props = {
	children: JSX.Element;
	isOpen: boolean;
	onClose: () => void;
	width?: string;
	closeByBackdrop?: boolean;
	closeByEsc?: boolean;
	contentProps?: object;
	overlayProps?: object;
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
					{children}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

import React from 'react';
import styles from './modal-overlay.module.css';

function ModalOverlay({ onClick }: { onClick: () => void }): JSX.Element {
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    return <div className={styles.modal_overlay} onClick={onClick} />;
}

export default ModalOverlay;

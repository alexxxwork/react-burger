import React from 'react';
import styles from './modal-overlay.module.css';

// eslint-disable-next-line react/prop-types
function ModalOverlay({ onClick }) {
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    return <div className={styles.modal_overlay} onClick={onClick} />;
}

export default ModalOverlay;

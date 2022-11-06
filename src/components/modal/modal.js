/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

function Modal(props) {
    // eslint-disable-next-line react/prop-types
    const { children, text, onClose } = props;
    const modalRoot = document.getElementById('modal');

    useEffect(() => {
        const onPressEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', onPressEsc);
        return () => document.removeEventListener('keydown', onPressEsc);
    }, []);

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onClose} />
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div
                        className={`${styles.header_text} text text_type_main-large`}
                    >
                        {text}
                    </div>
                    <CloseIcon type="primary" onClick={onClose} />
                </div>
                <div className={styles.content}>{children}</div>
            </div>
        </>,
        modalRoot
    );
}

Modal.propTypes = {
    text: PropTypes.string,
};
Modal.defaultProps = {
    text: '',
};
export default Modal;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { showModal } from '../../services/actions';

function Modal(props) {
    let { onClose } = props;
    const { children, text } = props;
    const dispatch = useDispatch();
    const modalRoot = document.getElementById('modal');
    const navigate = useNavigate();
    if (typeof onClose !== 'function') {
        onClose = () => {
            navigate(-1);
            dispatch(showModal(false));
        };
    }

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
                    <div className={styles.close_icon}>
                        <CloseIcon type="primary" onClick={onClose} />
                    </div>
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

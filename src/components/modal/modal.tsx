/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { showModal } from '../../services/actions';
import { useAppDispatch } from '../../services/store';

type TModalProps = {
    onClose: () => void;
    children: JSX.Element;
    text: string;
};

function Modal(props: TModalProps): JSX.Element {
    let { onClose } = props;
    const { children, text } = props;
    const dispatch = useAppDispatch();
    const modalRoot: HTMLElement = document.getElementById('modal')!;
    const navigate = useNavigate();
    if (typeof onClose !== 'function') {
        onClose = () => {
            navigate(-1);
            // @ts-ignore
            dispatch(showModal(false));
        };
    }

    useEffect(() => {
        const onPressEsc = (evt: KeyboardEvent): void => {
            if (evt.key === 'Escape') {
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

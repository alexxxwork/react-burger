/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import PropTypes from 'prop-types';
import '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../price/price';
// import ingridientType from '../../utils/types';
import Modal from '../modal/modal';
import OrderIcon from '../../images/order_logo.svg';
import styles from './order.module.css';

function Order({ onClose }) {
    return (
        <Modal text="" onClose={onClose}>
            <div className={`${styles.order_text} text text_type_main-medium`}>
                <div className="text text_type_digits-large mb-8">034536</div>
                <div className="text text_type_main-medium mb-7">
                    идентификатор заказа
                </div>
                <div className={styles.icon}>
                    <img src={OrderIcon} alt="Order" />
                </div>
                <div className="text text_type_main-default mb-2">
                    Ваш заказ начали готовить
                </div>
                <div className="text text_type_main-default text_color_inactive mb-2">
                    Дождитесь готовности на орбитальной станции
                </div>
            </div>
        </Modal>
    );
}
Order.propTypes = {
    onClose: PropTypes.func.isRequired,
};
export default Order;

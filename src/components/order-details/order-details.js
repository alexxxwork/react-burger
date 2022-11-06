import React from 'react';
// import PropTypes from 'prop-types';
import '@ya.praktikum/react-developer-burger-ui-components';
// import ingridientType from '../../utils/types';
import OrderIcon from '../../images/order_logo.svg';
import styles from './order-details.module.css';

function OrderDetails() {
    return (
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
    );
}
/*
OrderDetails.propTypes = {
    onClose: PropTypes.func.isRequired,
}; */
export default OrderDetails;

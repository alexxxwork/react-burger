import React from 'react';
import '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import OrderIcon from '../../images/order_logo.svg';
import styles from './order-details.module.css';

function OrderDetails() {
    const { isLoading, hasError, error, data } = useSelector(
        (store) => store.order
    );
    return (
        <div className={`${styles.order_text} text text_type_main-medium`}>
            {isLoading && (
                <p className={`text text_type_main-medium ${styles.centered}`}>
                    Загрузка...
                </p>
            )}
            {hasError && (
                <p className={`text text_type_main-medium ${styles.centered}`}>
                    Произошла ошибка: {data ? data.message : ''} {error}
                </p>
            )}
            {!isLoading && !hasError && data && data.order && (
                <>
                    <div className="text text_type_digits-large mb-8">
                        {data.order.number}
                    </div>
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
                </>
            )}
        </div>
    );
}

export default OrderDetails;

import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price.module.css';

function Price(props) {
    const { value, big } = props;
    let textStyle = ' text ';
    if (big) textStyle += 'text_type_digits-medium';
    else textStyle += 'text_type_digits-default';
    return (
        <div className={styles.block}>
            <div className={`${styles.element}${textStyle}`}>{value}</div>
            <div className={styles.element}>
                <CurrencyIcon type="primary" className={styles.icon} />
            </div>
        </div>
    );
}

Price.propTypes = {
    value: PropTypes.number.isRequired,
    big: PropTypes.bool,
};
Price.defaultProps = {
    big: false,
};
export default Price;

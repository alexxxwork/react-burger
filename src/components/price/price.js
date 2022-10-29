import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price.module.css';

function Price(props) {
    const vars = props;
    let textStyle = ' text ';
    if (vars.big) textStyle += 'text_type_digits-medium';
    else textStyle += 'text_type_digits-default';
    return (
        <div className={styles.block}>
            <div className={`${styles.element}${textStyle}`}>{vars.value}</div>
            <div className={styles.element}>
                <CurrencyIcon type="primary" className={styles.icon} />
            </div>
        </div>
    );
}

Price.propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    value: PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    big: PropTypes.bool,
};
Price.defaultProps = {
    big: false,
};
export default Price;

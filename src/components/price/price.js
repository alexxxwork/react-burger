import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price.module.css';

function Price(props) {
    const vars = props;
    return (
        <div className={styles.element}>
            <div className={`${styles.element} text text_type_digits-default`}>
                {vars.value}
            </div>
            <div className={styles.element}>
                <CurrencyIcon />
            </div>
        </div>
    );
}

Price.propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    value: PropTypes.string.isRequired,
};

export default Price;

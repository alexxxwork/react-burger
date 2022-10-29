import React from 'react';
// import PropTypes from 'prop-types';
import Price from '../price/price';
import ingridientType from '../../utils/types';
import styles from './card.module.css';

function Card({ item }) {
    return (
        <div className={`${styles.card} ml-4 mr-2`}>
            <img src={item.image} alt="element" className="ml-4 mr-4" />
            <div className={styles.card_text}>
                <Price value={item.price} />
            </div>
            <div className={styles.card_text}>{item.name}</div>
        </div>
    );
}

Card.propTypes = {
    item: ingridientType.isRequired,
};

export default Card;

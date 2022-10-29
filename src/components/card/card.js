import React from 'react';
import PropTypes from 'prop-types';
// import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../price/price';
import styles from './card.module.css';

const cardPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
});
function Card(props) {
    const { item } = props;
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
    item: cardPropTypes.isRequired,
};

export default Card;

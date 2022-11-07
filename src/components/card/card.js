/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../price/price';
import ingridientType from '../../utils/types';
// import Modal from '../modal/modal';
import styles from './card.module.css';
// import IngredientDetails from '../ingredient-details/ingredient-details';

function Card({ item, onClick }) {
    return (
        <div className={`${styles.card} ml-4 mr-2`}>
            <img
                src={item.image}
                alt={item.name}
                className="ml-4 mr-4"
                onClick={onClick}
            />
            <div className={styles.card_text}>
                <Price value={item.price} />
            </div>
            <div className={styles.card_text}>{item.name}</div>
        </div>
    );
}

Card.propTypes = {
    item: ingridientType.isRequired,
    onClick: PropTypes.func,
};
Card.defaultProps = {
    onClick: () => {},
};

export default Card;

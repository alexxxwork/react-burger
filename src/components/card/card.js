/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import Price from '../price/price';
import ingridientType from '../../utils/types';
// import Modal from '../modal/modal';
import styles from './card.module.css';
// import IngredientDetails from '../ingredient-details/ingredient-details';

function Card({ item, onClick, count, draggable }) {
    const [{ opacity }, ref] = useDrag({
        type: item.type,
        // eslint-disable-next-line no-underscore-dangle
        item: { ...item },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.9 : 1,
        }),
    });
    return (
        <div
            className={`${styles.card} ml-4 mr-2`}
            draggable={draggable}
            ref={ref}
            style={{ opacity }}
        >
            {count !== 0 && <Counter count={count} size="default" />}
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
    count: PropTypes.number,
    draggable: PropTypes.bool,
};
Card.defaultProps = {
    onClick: () => {},
    count: 0,
    draggable: false,
};

export default Card;

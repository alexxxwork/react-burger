/* eslint-disable no-underscore-dangle */
// Из-за поля _id в объекте item
import React from 'react';
import PropTypes from 'prop-types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import Price from '../price/price';
import { TIngridientType, ingridientType } from '../../utils/types';
import styles from './card.module.css';

type TCardProps = {
    item: TIngridientType;
    onClick: () => void;
    count: number;
    draggable: boolean;
};

function Card({ item, onClick, count, draggable }: TCardProps): JSX.Element {
    const [{ opacity }, ref] = useDrag({
        type: item.type,
        item: { ...item },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.9 : 1,
        }),
    });
    const location = useLocation();

    return (
        <div
            className={`${styles.card} ml-4 mr-2`}
            draggable={draggable}
            ref={ref}
            style={{ opacity }}
        >
            {count !== 0 && <Counter count={count} size="default" />}
            <Link
                to={`/ingredients/${item._id}`}
                state={{ background: location }}
                onClick={onClick}
                className={styles.link}
            >
                <img src={item.image} alt={item.name} className="ml-4 mr-4" />
                <div className={styles.card_text}>
                    <Price value={item.price} />
                </div>
                <div className={styles.card_text}>{item.name}</div>
            </Link>
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

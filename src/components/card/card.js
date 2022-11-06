/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
// import PropTypes from 'prop-types';
import '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../price/price';
import ingridientType from '../../utils/types';
import Modal from '../modal/modal';
import styles from './card.module.css';

function Card({ item }) {
    const [showModal, SetShowModal] = useState(false);
    const toggleDetails = () => {
        SetShowModal((prevState) => !prevState);
    };
    const closeDetails = () => {
        SetShowModal(false);
    };
    return (
        <div className={`${styles.card} ml-4 mr-2`}>
            {showModal && (
                <Modal onClose={closeDetails}>
                    <div className={`${styles.card_details}`}>
                        <img
                            src={item.image_large}
                            alt="ingridient"
                            className={styles.img}
                        />
                        <div
                            className={`${styles.card_text} text text_type_main-medium`}
                        >
                            {item.name}
                        </div>
                        <div className={styles.card_text}>
                            <div
                                className={`${styles.card_calories} text text_type_main-default`}
                            >
                                <div className={styles.card_box}>
                                    Калории,ккал
                                    <div className="text_type_digits-default">
                                        {item.calories}
                                    </div>
                                </div>
                                <div className={styles.card_box}>
                                    Белки, г
                                    <div className="text_type_digits-default">
                                        {item.proteins}
                                    </div>
                                </div>
                                <div className={styles.card_box}>
                                    Жиры, г
                                    <div className="text_type_digits-default">
                                        {item.fat}
                                    </div>
                                </div>
                                <div className={styles.card_box}>
                                    Углеводы, г
                                    <div className="text_type_digits-default">
                                        {item.carbohydrates}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
            <img
                src={item.image}
                alt="element"
                className="ml-4 mr-4"
                onClick={toggleDetails}
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
};

export default Card;

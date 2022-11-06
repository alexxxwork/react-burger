import React from 'react';
// import PropTypes from 'prop-types';
import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-details.module.css';
import ingridientType from '../../utils/types';

function IngredientDetails({ item }) {
    return (
        <div className={`${styles.card_details}`}>
            <img
                src={item.image_large}
                alt={item.name}
                className={styles.img}
            />
            <div className={`${styles.card_text} text text_type_main-medium`}>
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
    );
}
IngredientDetails.propTypes = {
    item: ingridientType.isRequired,
};

export default IngredientDetails;

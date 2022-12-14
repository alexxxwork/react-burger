import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-details.module.css';
import ingridientType from '../../utils/types';
// import { getItems } from '../../services/reducers/get-items';

function IngredientDetails(props) {
    let { item } = props;
    const { id } = useParams();
    // const dispatch = useDispatch();
    // const datalength = useSelector((s) => s.fetch.data.length);

    const { data } = useSelector((s) => s.fetch);
    if (!item && id && data.length) {
        // eslint-disable-next-line no-underscore-dangle
        [item] = data.filter((i) => i._id === id);
    }
    return (
        item && (
            <div className={`${styles.card_details}`}>
                <img
                    src={item.image_large}
                    alt={item.name}
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
        )
    );
}
IngredientDetails.propTypes = {
    item: ingridientType,
};
IngredientDetails.defaultProps = {
    item: null,
};

export default IngredientDetails;

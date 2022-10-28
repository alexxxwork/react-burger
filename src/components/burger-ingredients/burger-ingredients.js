import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../price/price';
import styles from './burger-ingredients.module.css';
import data from '../../utils/data';

function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one');
    return (
        <section className={styles.container}>
            <div className={`${styles.header} text text_type_main-default`}>
                Соберите бургер
            </div>
            <div className={`${styles.tab} mb-10`}>
                <Tab
                    value="buns"
                    active={current === 'buns'}
                    onClick={setCurrent}
                >
                    Булки
                </Tab>
                <Tab
                    value="sauce"
                    active={current === 'sauce'}
                    onClick={setCurrent}
                >
                    Соусы
                </Tab>
                <Tab
                    value="main"
                    active={current === 'main'}
                    onClick={setCurrent}
                >
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.cards} text text_type_main-default`}>
                {data
                    //     .filter((i) => i.type === 'bun')
                    .map((i) => (
                        // eslint-disable-next-line no-underscore-dangle
                        <React.Fragment key={i._id}>
                            <div className={`${styles.card} m-4`}>
                                <img src={i.image} alt="element" />
                                <div className={styles.card_text}>
                                    <Price value={i.price} />
                                </div>
                                <div className={styles.card_text}>{i.name}</div>
                            </div>
                        </React.Fragment>
                    ))}
            </div>
        </section>
    );
}

export default BurgerIngredients;

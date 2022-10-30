import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
// import Price from '../price/price';
import Card from '../card/card';
import styles from './burger-ingredients.module.css';
import data from '../../utils/data';

function BurgerIngredients() {
    const [current, setCurrent] = React.useState('buns');
    return (
        <section className={styles.container}>
            <div className={`${styles.header} text text_type_main-default`}>
                Соберите бургер
            </div>
            <div className={`${styles.tab}`}>
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
                <div
                    className={`${styles.section} text text_type_main-default mb-6 mt-10`}
                >
                    Булки
                </div>

                {data
                    .filter((i) => i.type === 'bun')
                    .map((i) => (
                        // eslint-disable-next-line no-underscore-dangle
                        <Card item={i} key={i._id} />
                    ))}
                <div
                    className={`${styles.section} text text_type_main-default mb-6 mt-10`}
                >
                    Соусы
                </div>
                {data
                    .filter((i) => i.type === 'sauce')
                    .map((i) => (
                        // eslint-disable-next-line no-underscore-dangle
                        <Card item={i} key={i._id} />
                    ))}
                <div
                    className={`${styles.section} text text_type_main-default mb-6 mt-10`}
                >
                    Начинки
                </div>
                {data
                    .filter((i) => i.type === 'main')
                    .map((i) => (
                        // eslint-disable-next-line no-underscore-dangle
                        <Card item={i} key={i._id} />
                    ))}
            </div>
        </section>
    );
}

export default BurgerIngredients;

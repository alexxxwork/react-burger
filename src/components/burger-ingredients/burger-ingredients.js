/* eslint-disable no-underscore-dangle */
import React from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Card from '../card/card';
import styles from './burger-ingredients.module.css';
import ingridientType from '../../utils/types';
// import ModalOverlay from '../modal-overlay/modal-overlay';
// import Modal from '../modal/modal';

const BUN_NAME = 'bun';
const SAUCE_NAME = 'sauce';
const MAIN_NAME = 'main';

function BurgerIngredients({ data }) {
    const [current, setCurrent] = React.useState('buns');
    // const modalRoot = document.getElementById('modal');

    // const showDetails = () => <Modal />;

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
                    .filter((i) => i.type === BUN_NAME)
                    .map((i) => (
                        <Card item={i} key={i._id} />
                    ))}
                <div
                    className={`${styles.section} text text_type_main-default mb-6 mt-10`}
                >
                    Соусы
                </div>
                {data
                    .filter((i) => i.type === SAUCE_NAME)
                    .map((i) => (
                        <Card item={i} key={i._id} />
                    ))}
                <div
                    className={`${styles.section} text text_type_main-default mb-6 mt-10`}
                >
                    Начинки
                </div>
                {data
                    .filter((i) => i.type === MAIN_NAME)
                    .map((i) => (
                        <Card item={i} key={i._id} />
                    ))}
            </div>
        </section>
    );
}
BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingridientType).isRequired,
};

export default BurgerIngredients;

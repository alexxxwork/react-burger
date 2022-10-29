import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
//  import { Tab } from '@ya.praktikum/react-developer-burger-ui-components' ;
import styles from './main.module.css';

function Main() {
    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </>
    );
}

export default Main;

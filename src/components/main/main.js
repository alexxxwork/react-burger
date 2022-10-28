import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
//  import { Tab } from '@ya.praktikum/react-developer-burger-ui-components' ;

function Main() {
    return (
        <>
            <AppHeader />
            <main>
                <BurgerIngredients />
            </main>
        </>
    );
}

export default Main;

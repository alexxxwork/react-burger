import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@ya.praktikum/react-developer-burger-ui-components';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { rootReducer } from '../../services/reducers';
import { API_URL } from '../../utils/constants';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import styles from './app.module.css';

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

function App() {
    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: [],
        bun: null,
        ingredients: [],
        order: {
            data: [],
            isLoading: false,
            hasError: false,
        },
        error: null,
    });

    React.useEffect(() => {
        const getData = async () => {
            await fetch(API_URL)
                .then(async (res) => {
                    if (!res.ok) {
                        const json = await res.json();
                        throw new Error(json);
                    }
                    return res.json();
                })
                .then((data) =>
                    setState({ ...state, data: data.data, isLoading: false })
                )
                .catch((err) => {
                    setState({
                        ...state,
                        hasError: true,
                        isLoading: false,
                        error: err,
                    });
                });
        };
        setState({ ...state, hasError: false, isLoading: true, error: null });
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Provider store={store}>
            <AppHeader />
            {state.isLoading && (
                <p className={`text text_type_main-medium ${styles.centered}`}>
                    Загрузка...
                </p>
            )}
            {state.hasError && (
                <p className={`text text_type_main-medium ${styles.centered}`}>
                    Не удалось загрузить данные
                </p>
            )}
            {!state.isLoading && !state.hasError && state.data.length && (
                <main className={styles.main}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                </main>
            )}
        </Provider>
    );
}

export default App;

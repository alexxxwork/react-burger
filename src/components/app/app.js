import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
// import Modal from '../modal/modal';
// import ModalOverlay from '../modal-overlay/modal-overlay';
import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app.module.css';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: [],
    });

    React.useEffect(() => {
        const getData = async () => {
            fetch(API_URL)
                .then((res) => res.json())
                .then((data) =>
                    setState({ ...state, data: data.data, isLoading: false })
                )
                .catch(() => {
                    setState({ ...state, hasError: true, isLoading: false });
                });
        };
        setState({ ...state, hasError: false, isLoading: true });
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
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
                    <BurgerIngredients data={state.data} />
                    <BurgerConstructor data={state.data} />
                </main>
            )}
        </>
    );
}

export default App;

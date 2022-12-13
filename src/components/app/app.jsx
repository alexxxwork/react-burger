import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import '@ya.praktikum/react-developer-burger-ui-components';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Login from '../../pages/login';
import Register from '../../pages/register';
import Route404 from '../../pages/404';

import styles from './app.module.css';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import Logout from '../../pages/logout';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import store from '../../services/store';
import { getItems } from '../../services/actions';

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;
    const onClose = () => navigate(-1);
    const dispatch = useDispatch();
    React.useEffect(() => dispatch(getItems()), [dispatch]);

    return (
        <Provider store={store}>
            <AppHeader />
            <main className={styles.main}>
                <Routes location={background || location}>
                    <Route
                        path="/"
                        element={
                            <DndProvider backend={HTML5Backend}>
                                <BurgerIngredients />
                                <BurgerConstructor />
                            </DndProvider>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/ingredients/:id"
                        element={<IngredientDetails />}
                    />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/profile" element={<ProtectedRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element={<Route404 />} />
                </Routes>
                {background && (
                    <Routes>
                        <Route
                            path="/ingredients/:id"
                            element={
                                <Modal
                                    text="Детали ингредиента"
                                    onClose={onClose}
                                >
                                    <IngredientDetails />
                                </Modal>
                            }
                        />
                    </Routes>
                )}
            </main>
        </Provider>
    );
}

export default App;

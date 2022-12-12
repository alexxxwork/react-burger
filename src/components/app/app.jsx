import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@ya.praktikum/react-developer-burger-ui-components';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import rootReducer from '../../services/reducers';

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

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

function App() {
    return (
        <Provider store={store}>
            <Router>
                <AppHeader />
                <main className={styles.main}>
                    <Routes>
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
                        <Route
                            path="/reset-password"
                            element={<ResetPassword />}
                        />
                        <Route path="/profile" element={<ProtectedRoute />}>
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                        <Route path="/logout" element={<Logout />} />
                        <Route path="*" element={<Route404 />} />
                    </Routes>
                </main>
            </Router>
        </Provider>
    );
}

export default App;

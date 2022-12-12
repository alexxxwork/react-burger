import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderElement from '../header-element/header-element';
import styles from './app-header.module.css';

function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <div className={styles.left_block}>
                    <HeaderElement>
                        <a href="#top" className={styles.element}>
                            <div className={styles.element}>
                                <BurgerIcon type="primary" />
                            </div>
                            <div
                                className={`${styles.element} text text_type_main-default`}
                            >
                                Конструктор
                            </div>
                        </a>
                    </HeaderElement>
                    <HeaderElement>
                        <a href="#top" className={styles.element}>
                            <div className={styles.element}>
                                <ListIcon type="secondary" />
                            </div>
                            <div
                                className={`${styles.element_inactive} text text_type_main-default text_color_inactive`}
                            >
                                Лента заказов
                            </div>
                        </a>
                    </HeaderElement>
                </div>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.right_block}>
                    <NavLink to="/profile" className={styles.element}>
                        <HeaderElement>
                            <div className={styles.element}>
                                <ProfileIcon type="primary" />
                            </div>
                            <div className={styles.element}>Личный кабинет</div>
                        </HeaderElement>
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;

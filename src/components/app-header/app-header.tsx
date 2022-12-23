import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderElement from '../header-element/header-element';
import styles from './app-header.module.css';

function AppHeader(): JSX.Element {
    const isConstructor = !!useMatch({ path: '/', end: true });
    const constructorStyle = isConstructor
        ? styles.element
        : styles.element_inactive;
    const isFeed = !!useMatch('/feed');
    const feedStyle = isFeed ? styles.element : styles.element_inactive;
    const isProfile = !!useMatch('/profile');
    const profileStyle = isProfile ? styles.element : styles.element_inactive;

    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <div className={styles.left_block}>
                    <HeaderElement>
                        <NavLink to="/" className={constructorStyle}>
                            <div className={constructorStyle}>
                                <BurgerIcon
                                    type={
                                        isConstructor ? 'primary' : 'secondary'
                                    }
                                />
                            </div>
                            <div
                                className={`${constructorStyle} text text_type_main-default`}
                            >
                                Конструктор
                            </div>
                        </NavLink>
                    </HeaderElement>
                    <HeaderElement>
                        <NavLink to="/feed" className={feedStyle}>
                            <div className={feedStyle}>
                                <ListIcon
                                    type={isFeed ? 'primary' : 'secondary'}
                                />
                            </div>
                            <div
                                className={`${feedStyle} text text_type_main-default text_color_inactive`}
                            >
                                Лента заказов
                            </div>
                        </NavLink>
                    </HeaderElement>
                </div>
                <div className={styles.logo}>
                    <NavLink to="/">
                        <Logo />
                    </NavLink>
                </div>
                <div className={styles.right_block}>
                    <NavLink to="/profile" className={profileStyle}>
                        <HeaderElement>
                            <>
                                <div className={profileStyle}>
                                    <ProfileIcon
                                        type={
                                            isProfile ? 'primary' : 'secondary'
                                        }
                                    />
                                </div>
                                <div className={profileStyle}>
                                    Личный кабинет
                                </div>
                            </>
                        </HeaderElement>
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;

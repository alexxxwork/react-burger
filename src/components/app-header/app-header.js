import React from 'react';
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
                        <div className={styles.element}>
                            <BurgerIcon type="primary" />
                        </div>
                        <div className={styles.element}>Конструктор</div>
                    </HeaderElement>
                    <HeaderElement>
                        <div className={styles.element}>
                            <ListIcon type="primary" />
                        </div>
                        <div className={styles.element}>Лента заказов</div>
                    </HeaderElement>
                </div>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.right_block}>
                    {/* <HeaderElement>
                    <div className={styles.element} />
                </HeaderElement> */}
                    <HeaderElement>
                        <div className={styles.element}>
                            <ProfileIcon type="primary" />
                        </div>
                        <div className={styles.element}>Личный кабинет</div>
                    </HeaderElement>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;

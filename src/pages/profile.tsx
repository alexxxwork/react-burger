import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AnyAction } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { auth } from '../services/actions';
import {
    useAppDispatch,
    useAppSelector,
    RootState,
    // @ts-ignore
} from '../services/store/store.ts';
import styles from './pages.module.css';

function Profile() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((store: RootState) => store.auth.user);

    const [form, setForm] = useState({
        name: user?.name,
        email: user?.email,
        password: user?.password,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(auth.patchUser({ name: form.name }));
    };
    // const onChange = (field, event) => {
    //    dispatch(setUser({ ...user, [field]: event.target.value }));
    // };

    return (
        <div className={styles.profileBlock}>
            <div className={styles.leftBlock}>
                <div className="text text_type_main-medium pt-4 pb-4">
                    <Link to="/profile" className={styles.link}>
                        Профиль
                    </Link>
                </div>
                <div className="text text_type_main-medium text_color_inactive pt-4 pb-4">
                    История заказов
                </div>
                <div className="text text_type_main-medium text_color_inactive pt-4 pb-4">
                    {/* <NavLink to="/logout" className={styles.link_inactive}>
                        Выход
                    </NavLink> */}
                    <a
                        href="#top"
                        className={styles.link_inactive}
                        onClick={() => dispatch(auth.getLogout())}
                    >
                        Выход
                    </a>
                </div>
                <div className="text text_type_main-default text_color_inactive mt-20">
                    В этом разделе вы сможете изменить свои персональные данные
                </div>
            </div>
            <form onSubmit={onSubmit} className={styles.form}>
                <div className="ml-15 mr-15">
                    <Input
                        placeholder="Имя"
                        extraClass="p-3"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />
                    <Input
                        placeholder="Логин"
                        extraClass="p-3"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />
                    <PasswordInput
                        placeholder="Пароль"
                        extraClass="p-3"
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />
                    <div className={styles.buttons}>
                        <Button htmlType="reset" type="secondary">
                            Отменить
                        </Button>
                        <Button htmlType="submit" extraClass="mr-3">
                            Сохранить
                        </Button>
                    </div>
                </div>
            </form>
            <div className={styles.leftBlock} />
        </div>
    );
}

export default Profile;

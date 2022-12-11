import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Input,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getResetPassword } from '../services/reducers/password-functions';
import styles from './pages.module.css';

function ResetPassword() {
    // const onRegisterClick = () => <Link to="/" />;
    const [form, setForm] = React.useState({
        password: '',
        token: '',
    });
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(getResetPassword(form.password, form.token));
    };

    return (
        <div className={`${styles.block} pt-5 text text_type_main-medium`}>
            <div className="p-3">Восстановление пароля</div>
            <style>{'label { top: 8px !important; }'}</style>
            <PasswordInput
                placeholder="Введите новый пароль"
                extraClass="p-3"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Input
                placeholder="Введите код из письма"
                extraClass="p-3"
                value={form.token}
                onChange={(e) => setForm({ ...form, token: e.target.value })}
            />
            <div className="pt-3 pb-20">
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={onClick}
                >
                    Сохранить
                </Button>
            </div>
            <div
                className={`${styles.centered} text text_type_main-default text_color_inactive`}
            >
                <div className="pl-10 pr-2">Вспомнили пароль?</div>
                <Link to="/login">
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        extraClass="pl-2 pt-1 pb-1"
                        // onClick={onRegisterClick}
                    >
                        Войти
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default ResetPassword;

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    EmailInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getRestorePassword } from '../services/actions';
import styles from './pages.module.css';

function ForgotPassword() {
    const [form, setForm] = React.useState({
        email: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(getRestorePassword(form.email));
        navigate('/reset-password', {
            state: { from: location },
        });
    };
    return (
        <div className={`${styles.block} pt-5 text text_type_main-medium`}>
            <form onSubmit={onSubmit} className={styles.form}>
                <div className="p-3">Восстановление пароля</div>
                <EmailInput
                    placeholder="Укажите e-mail"
                    extraClass="p-3"
                    value={form.email}
                    onChange={(e) => setForm({ email: e.target.value })}
                />
                <div className="pt-3 pb-20">
                    <Button htmlType="submit" type="primary" size="medium">
                        Восстановить
                    </Button>
                </div>
            </form>
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
                    >
                        Войти
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default ForgotPassword;

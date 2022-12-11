import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    EmailInput,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getLogin, getUser } from '../services/reducers/password-functions';
import styles from './pages.module.css';

function Login() {
    const [form, setForm] = React.useState({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onClick = () => {
        dispatch(getLogin(form));
        navigate('/');
    };
    React.useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <div className={`${styles.block} pt-5 text text_type_main-medium`}>
            <div className="p-3">Вход</div>
            <EmailInput
                placeholder="E-mail"
                extraClass="p-3"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <PasswordInput
                placeholder="Пароль"
                extraClass={`${styles.input} p-3`}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && onClick()}
            />
            <div className="pt-3 pb-20">
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={onClick}
                >
                    Войти
                </Button>
            </div>
            <div
                className={`${styles.centered} text text_type_main-default text_color_inactive`}
            >
                <div className="pl-10 pr-2">Вы - новый пользователь?</div>
                <Link to="/register">
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        extraClass="pl-2 pt-1 pb-1"
                    >
                        Зарегистрироваться
                    </Button>
                </Link>
            </div>
            <div
                className={`${styles.centered} text text_type_main-default text_color_inactive`}
            >
                <div className="pl-10 pr-2">Забыли пароль?</div>
                <Link to="/forgot-password">
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        extraClass="pl-2 pt-1 pb-1"
                    >
                        Восстановить пароль
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Login;

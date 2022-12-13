import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    EmailInput,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getLogin, getUser } from '../services/actions';
import styles from './pages.module.css';

function Login() {
    const [form, setForm] = React.useState({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector((s) => s.password.user);
    const onClick = () => {
        dispatch(getLogin(form));
    };
    React.useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    // if (user) navigate(location?.state?.from || '/');
    if (user) return <Navigate to={location?.state?.from || '/'} />;

    return (
        <div className={`${styles.block} pt-5 text text_type_main-medium`}>
            <form onSubmit={onClick} className={styles.form}>
                <div className="p-3">Вход</div>
                <EmailInput
                    placeholder="E-mail"
                    extraClass="p-3"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />
                <PasswordInput
                    placeholder="Пароль"
                    extraClass={`${styles.input} p-3`}
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />
                <div className="pt-3 pb-20">
                    <Button htmlType="submit" type="primary" size="medium">
                        Войти
                    </Button>
                </div>
            </form>
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

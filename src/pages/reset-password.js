import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Input,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { auth } from '../services/actions';
import styles from './pages.module.css';

function ResetPassword() {
    const [form, setForm] = React.useState({
        password: '',
        token: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const err = useSelector((s) => s.auth.resetpwdata?.success);

    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(auth.getResetPassword(form.password, form.token));
        if (!(err || typeof err === 'undefined')) navigate('/');
        return false;
    };

    React.useEffect(() => {
        if (
            !(
                location.state?.from?.pathname &&
                location.state?.from?.pathname === '/forgot-password'
            )
        ) {
            navigate('/forgot-password');
        }
    }, [location.state?.from?.pathname, navigate]);

    return (
        <div className={`${styles.block} pt-5 text text_type_main-medium`}>
            <form onSubmit={onSubmit} className={styles.form}>
                <div className="p-3">Восстановление пароля</div>
                {err && <div>Ошибка проверьте введенный код</div>}
                <PasswordInput
                    placeholder="Введите новый пароль"
                    extraClass="p-3"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />
                <Input
                    placeholder="Введите код из письма"
                    extraClass="p-3"
                    value={form.token}
                    onChange={(e) =>
                        setForm({ ...form, token: e.target.value })
                    }
                />
                <div className="pt-3 pb-20">
                    <Button htmlType="submit" type="primary" size="medium">
                        Сохранить
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

export default ResetPassword;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Input,
    EmailInput,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { getRegister, getLogin } from '../services/actions';

function Register() {
    const [form, setForm] = React.useState({
        name: '',
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(getRegister(form));
        await dispatch(getLogin(form));
        navigate('/');
    };
    return (
        <div className={`${styles.block} pt-5 text text_type_main-medium`}>
            <form onSubmit={onSubmit} className={styles.form}>
                <div className="p-3">Регистрация</div>
                <Input
                    placeholder="Имя"
                    extraClass="p-3"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
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
                    extraClass="p-3"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />
                <div className="pt-3 pb-20">
                    <Button htmlType="submit" type="primary" size="medium">
                        Зарегистрироваться
                    </Button>
                </div>
            </form>
            <div
                className={`${styles.centered} text text_type_main-default text_color_inactive`}
            >
                <div className="pl-10 pr-2">Уже зарегистрированы?</div>
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

export default Register;

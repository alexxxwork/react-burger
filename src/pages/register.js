import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Input,
    EmailInput,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { getRegister } from '../services/reducers/password-functions';

function Register() {
    const [form, setForm] = React.useState({
        name: '',
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(getRegister(form));
    };
    return (
        <div className={`${styles.block} pt-5 text text_type_main-medium`}>
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
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <PasswordInput
                placeholder="Пароль"
                extraClass="p-3"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <div className="pt-3 pb-20">
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={onClick}
                >
                    Зарегистрироваться
                </Button>
            </div>
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

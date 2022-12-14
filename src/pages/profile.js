import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { setUser, patchUser } from '../services/actions';
import styles from './pages.module.css';

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((s) => s.password.user);
    const [form, setForm] = useState({
        name: user?.name,
        email: user?.email,
        password: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(patchUser(form));
    };
    const onChange = (field, event) => {
        dispatch(setUser({ ...user, [field]: event.target.value }));
    };

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
                    <NavLink to="/logout" className={styles.link_inactive}>
                        Выход
                    </NavLink>
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
                        value={user.name}
                        onChange={(e) => onChange('name', e)}
                        onKeyDown={(e) => e.key === 'Enter' && onclick()}
                    />
                    <Input
                        placeholder="Логин"
                        extraClass="p-3"
                        value={user.email}
                        onChange={(e) => onChange('email', e)}
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

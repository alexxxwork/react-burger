import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import {
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import { getUser } from '../services/reducers/password-functions';
import { setUser } from '../services/actions';
import styles from './pages.module.css';

// import { getRegister } from '../services/reducers/password-functions';

function Profile() {
    const [form, setForm] = useState({
        password: '',
    });

    const dispatch = useDispatch();
    const user = useSelector((s) => s.password.user);
    // useEffect(() => {
    //     dispatch(getUser());
    // }, [dispatch]);

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
            <div className="ml-15 mr-15">
                <Input
                    placeholder="Имя"
                    extraClass="p-3"
                    value={user.name}
                    onChange={(e) =>
                        dispatch(setUser({ ...user, name: e.target.value }))
                    }
                />
                <Input
                    placeholder="Логин"
                    extraClass="p-3"
                    value={user.email}
                    onChange={(e) =>
                        dispatch(setUser({ ...user, email: e.target.value }))
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
            </div>
            <div className={styles.leftBlock} />
        </div>
    );
}

export default Profile;

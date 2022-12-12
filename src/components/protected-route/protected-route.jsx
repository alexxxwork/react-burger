import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { getUser } from '../../services/reducers/password-functions';

function ProtectedRoute() {
    // const [isUserLoaded, setUserLoaded] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((s) => s.password.user);

    const init = async () => {
        // Вызовем запрос getUser и изменим состояние isUserLoaded
        await dispatch(getUser());
    };

    useEffect(() => {
        // При монтировании компонента запросим данные о пользователе
        init();
        // Это не работает по-другому
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const err = useSelector((s) => s.password.hasError.user);
    if (err) {
        return null;
    }
    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;

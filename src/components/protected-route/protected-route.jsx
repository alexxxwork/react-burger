import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { getUser } from '../../services/actions';

function ProtectedRoute() {
    const dispatch = useDispatch();
    const location = useLocation();
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
        delete localStorage.refreshToken;
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
}

export default ProtectedRoute;

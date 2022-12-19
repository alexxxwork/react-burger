import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ auth }) {
    const location = useLocation();
    const user = useSelector((s) => s.auth.user);
    const from = location.state?.from || '/';

    if (!auth && user) {
        // ...то отправляем его на предыдущую страницу
        return <Navigate to={from} />;
    }
    if (!auth && !user) {
        // вариант с /login
        return <Outlet />;
    }

    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
}

ProtectedRoute.propTypes = {
    auth: PropTypes.bool.isRequired,
};
export default ProtectedRoute;

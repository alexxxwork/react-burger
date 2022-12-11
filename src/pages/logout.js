import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getLogout } from '../services/reducers/password-functions';

function Logout() {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getLogout());
    }, [dispatch]);
    // const navigate = useNavigate();
    // navigate({ pathname: '/login' });
    return <Navigate to="/login" />; // redirect('/login');
}

export default Logout;

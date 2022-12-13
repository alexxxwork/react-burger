import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getLogout } from '../services/actions';

function Logout() {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getLogout());
    }, [dispatch]);

    return <Navigate to="/login" />;
}

export default Logout;

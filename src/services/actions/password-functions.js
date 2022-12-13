import { createAction } from '@reduxjs/toolkit';
import { fetchWithRefresh, checkResponse } from '../../utils/api';
import {
    PASSWORD_RESTORE_PATH,
    PASSWORD_RESET_PATH,
    REGISTER_PATH,
    LOGIN_PATH,
    LOGOUT_PATH,
    USER_PATH,
    API_BASE,
} from '../../utils/constants';

export const getPasswordResetSuccess = createAction(
    'passwordReset/GET_SUCCESS'
);
export const getPasswordResetFailed = createAction('passwordReset/GET_FAILED');
export const getPasswordResetClear = createAction('passwordReset/GET_CLEAR');
export const getPasswordRestoreSuccess = createAction(
    'passwordRestore/GET_SUCCESS'
);
export const getPasswordRestoreFailed = createAction(
    'passwordRestore/GET_FAILED'
);
export const getRegisterSuccess = createAction(
    'register/GET_SUCCESS',
    (item) => ({
        payload: {
            ...item,
            accessToken: item.accessToken.replace('Bearer ', ''),
        },
    })
);
export const getRegisterFailed = createAction('register/GET_FAILED');

export const getLoginSuccess = createAction('login/GET_SUCCESS', (item) => ({
    payload: {
        ...item,
        accessToken: item.accessToken.replace('Bearer ', ''),
    },
}));
export const getLoginFailed = createAction('login/GET_FAILED');

export const getUserSuccess = createAction('user/GET_SUCCESS');
export const getUserFailed = createAction('user/GET_FAILED');
export const setUser = createAction('user/SET');

export function getRestorePassword(email) {
    return (dispatch) => {
        fetch(`${API_BASE}${PASSWORD_RESTORE_PATH}`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
            }),
        })
            .then(checkResponse)
            .then((data) => {
                dispatch(getPasswordRestoreSuccess(data));
            })
            .catch((err) => {
                dispatch(getPasswordRestoreFailed(err));
            });
    };
}

export function getResetPassword(password, token) {
    return (dispatch) => {
        dispatch(getPasswordResetClear());
        fetch(`${API_BASE}${PASSWORD_RESET_PATH}`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password,
                token,
            }),
        })
            .then(checkResponse)
            .then((data) => {
                dispatch(getPasswordResetSuccess(data));
            })
            .catch((err) => {
                dispatch(getPasswordResetFailed(err));
            });
    };
}

export function getRegister(form) {
    return (dispatch) => {
        fetch(`${API_BASE}${REGISTER_PATH}`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
            .then(checkResponse)
            .then((data) => {
                dispatch(getRegisterSuccess(data));
            })
            .catch((err) => {
                dispatch(getRegisterFailed(err));
            });
    };
}
export function getLogin(form) {
    return (dispatch) => {
        fetch(`${API_BASE}${LOGIN_PATH}`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
            .then(checkResponse)
            .then((data) => {
                dispatch(getLoginSuccess(data));
            })
            .catch((err) => {
                dispatch(getLoginFailed(err));
            });
    };
}
export function getUser() {
    return (dispatch) => {
        const { accessToken } = localStorage;
        fetchWithRefresh(`${API_BASE}${USER_PATH}`, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((data) => {
                dispatch(getUserSuccess(data));
            })
            .catch((err) => {
                dispatch(getUserFailed(err));
            });
    };
}
export function patchUser(form) {
    return (dispatch) => {
        const { accessToken } = localStorage;
        fetchWithRefresh(`${API_BASE}${USER_PATH}`, {
            method: 'patch',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(form),
        })
            .then((data) => {
                dispatch(getUserSuccess(data));
            })
            .catch((err) => {
                dispatch(getUserFailed(err));
            });
    };
}
export function getLogout() {
    return (dispatch) => {
        const { refreshToken } = localStorage;
        fetch(`${API_BASE}${LOGOUT_PATH}`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: refreshToken }),
        }).then(checkResponse);
        dispatch(setUser(null));
        localStorage.clear();
    };
}

import { createAction } from '@reduxjs/toolkit';
import { fetchWithRefresh, request } from '../../utils/api';
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
export const getUserUpdateSuccess = createAction('user/GET_UPDATE_SUCCESS');
export const getUserUpdateFailed = createAction('user/GET_UPDATE_FAILED');
export const checkedAuth = createAction('user/CHECKED_AUTH');

export const setUser = createAction('user/SET');

export function getRestorePassword(email) {
    return (dispatch) => {
        request(`${API_BASE}${PASSWORD_RESTORE_PATH}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
            }),
        })
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
        request(`${API_BASE}${PASSWORD_RESET_PATH}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password,
                token,
            }),
        })
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
        request(`${API_BASE}${REGISTER_PATH}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
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
        request(`${API_BASE}${LOGIN_PATH}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
            .then((data) => {
                if (data.success) dispatch(getLoginSuccess(data));
                else dispatch(getLoginFailed());
            })
            .catch((err) => {
                dispatch(getLoginFailed(err));
            });
    };
}
export function getUser() {
    return (dispatch) => {
        const { accessToken } = localStorage;
        if (accessToken)
            return fetchWithRefresh(`${API_BASE}${USER_PATH}`, {
                // method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((data) => {
                    if (data.success) {
                        dispatch(getUserSuccess(data));
                    } else {
                        delete localStorage.accessToken;
                    }
                })
                .catch(() => {});
        dispatch(getUserFailed());
        return new Promise();
    };
}
export function checkAuth() {
    return (dispatch) => {
        const { accessToken } = localStorage;
        if (accessToken) {
            dispatch(getUser()).finally(() => dispatch(checkedAuth()));
        } else dispatch(checkedAuth());
    };
}
export function patchUser(form) {
    return (dispatch) => {
        const { accessToken } = localStorage;
        fetchWithRefresh(`${API_BASE}${USER_PATH}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(form),
        })
            .then((data) => {
                dispatch(getUserUpdateSuccess(data));
            })
            .catch(() => {
                dispatch(getUserUpdateFailed());
            });
    };
}
export function getLogout() {
    return (dispatch) => {
        const { refreshToken } = localStorage;
        if (refreshToken)
            request(`${API_BASE}${LOGOUT_PATH}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: refreshToken }),
            }).catch(() => {});
        dispatch(setUser(null));
        localStorage.clear();
    };
}

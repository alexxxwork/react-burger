/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { fetchWithRefresh, checkResponse } from '../../utils/api';
import {
    getPasswordResetSuccess,
    getPasswordResetFailed,
    getPasswordRestoreSuccess,
    getPasswordRestoreFailed,
    getRegisterSuccess,
    getRegisterFailed,
    getLoginSuccess,
    getLoginFailed,
    getUserSuccess,
    getUserFailed,
    setUser,
} from '../actions';
import {
    PASSWORD_RESTORE_PATH,
    PASSWORD_RESET_PATH,
    REGISTER_PATH,
    LOGIN_PATH,
    LOGOUT_PATH,
    USER_PATH,
    API_BASE,
} from '../../utils/constants';

export const initialState = {
    hasError: {
        reset: false,
        restore: false,
        register: false,
        login: false,
        user: false,
    },
    accessToken: '',
    refreshToken: '',
    error: '',
    user: null,
    password: '',
};
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
            .then(async (res) => {
                if (!res.ok) {
                    const json = await res.json();
                    throw new Error(json);
                }
                return res.json();
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
            .then(async (res) => {
                if (!res.ok) {
                    const json = await res.json();
                    throw new Error(json);
                }
                return res.json();
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
        fetch(`${API_BASE}${REGISTER_PATH}`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
            .then(async (res) => {
                if (!res.ok) {
                    const json = await res.json();
                    throw new Error(json);
                }
                return res.json();
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
        fetch(`${API_BASE}${LOGIN_PATH}`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
            .then(async (res) => {
                if (!res.ok) {
                    const json = await res.json();
                    throw new Error(json);
                }
                return res.json();
            })
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
        // const { accessToken } = getState().password;
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
export const getPasswordReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getPasswordRestoreSuccess, (state) => {
            state.hasError.restore = false;
        })
        .addCase(getPasswordRestoreFailed, (state, action) => {
            state.hasError.restore = true;
            state.error = action.payload;
        })
        .addCase(getPasswordResetSuccess, (state) => {
            state.hasError.restore = false;
        })
        .addCase(getPasswordResetFailed, (state, action) => {
            state.hasError.reset = true;
            state.error = action.payload;
        })
        .addCase(getRegisterSuccess, (state, action) => {
            state.hasError.register = false;
            if (action.payload.success === true) {
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.user = action.payload.user;
                localStorage.accessToken = state.accessToken;
                localStorage.refreshToken = state.refreshToken;
            }
        })
        .addCase(getRegisterFailed, (state, action) => {
            state.hasError.register = true;
            state.error = action.payload;
        })
        .addCase(getLoginSuccess, (state, action) => {
            state.hasError.login = false;
            if (action.payload.success === true) {
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.user = action.payload.user;
                localStorage.accessToken = state.accessToken;
                localStorage.refreshToken = state.refreshToken;
            }
        })
        .addCase(getLoginFailed, (state, action) => {
            state.hasError.login = true;
            state.error = action.payload;
        })
        .addCase(getUserSuccess, (state, action) => {
            state.hasError.user = false;
            if (action.payload.success === true) {
                state.user = action.payload.user;
            }
        })
        .addCase(getUserFailed, (state, action) => {
            state.hasError.user = true;
            state.error = action.payload;
        })
        .addCase(setUser, (state, action) => {
            state.user = action.payload;
        });
});

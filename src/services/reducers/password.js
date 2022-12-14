/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import {
    getPasswordResetSuccess,
    getPasswordResetFailed,
    getPasswordRestoreSuccess,
    getPasswordRestoreFailed,
    getPasswordResetClear,
    getRegisterSuccess,
    getRegisterFailed,
    getLoginSuccess,
    getLoginFailed,
    getUserSuccess,
    getUserFailed,
    getUserUpdateSuccess,
    getUserUpdateFailed,
    setUser,
} from '../actions';

export const initialState = {
    hasError: {
        reset: false,
        restore: false,
        register: false,
        login: false,
        user: false,
        updateUser: false,
    },
    accessToken: '',
    refreshToken: '',
    resetpwdata: null,
    error: '',
    user: null,
    password: '',
};

export const getPasswordReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getPasswordRestoreSuccess, (state) => {
            state.hasError.restore = false;
        })
        .addCase(getPasswordRestoreFailed, (state, action) => {
            state.hasError.restore = true;
            state.error = action.payload;
        })
        .addCase(getPasswordResetSuccess, (state, action) => {
            state.hasError.restore = false;
            state.resetpwdata = action.payload;
        })
        .addCase(getPasswordResetFailed, (state, action) => {
            state.hasError.reset = true;
            state.error = action.payload;
        })
        .addCase(getPasswordResetClear, (state) => {
            state.hasError.reset = false;
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
            state.hasError.login = true;
            if (action.payload.success === true) {
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.user = action.payload.user;
                localStorage.accessToken = state.accessToken;
                localStorage.refreshToken = state.refreshToken;
                state.hasError.login = false;
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
        .addCase(getUserUpdateSuccess, (state) => {
            state.hasError.updateUser = false;
            // if (action.payload.success === true) {
            //    state.user = action.payload.user;
            // }
        })
        .addCase(getUserUpdateFailed, (state, action) => {
            state.hasError.updateUser = true;
            state.error = action.payload;
        })
        .addCase(setUser, (state, action) => {
            state.user = action.payload;
        });
});

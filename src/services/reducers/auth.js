/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { auth } from '../actions';

export const initialState = {
    hasError: {
        reset: false,
        restore: false,
        register: false,
        login: false,
        updateUser: false,
    },
    accessToken: '',
    refreshToken: '',
    resetpwdata: null,
    error: '',
    authChecked: false,
    user: null,
    password: '',
};

export const getAuthReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(auth.getPasswordRestoreSuccess, (state) => {
            state.hasError.restore = false;
        })
        .addCase(auth.getPasswordRestoreFailed, (state, action) => {
            state.hasError.restore = true;
            state.error = action.payload;
        })
        .addCase(auth.getPasswordResetSuccess, (state, action) => {
            state.hasError.reset = false;
            state.resetpwdata = action.payload;
        })
        .addCase(auth.getPasswordResetFailed, (state, action) => {
            state.hasError.reset = true;
            state.error = action.payload;
        })
        .addCase(auth.getPasswordResetClear, (state) => {
            state.hasError.reset = false;
        })
        .addCase(auth.getRegisterSuccess, (state, action) => {
            state.hasError.register = false;
            if (action.payload.success === true) {
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.user = action.payload.user;
                localStorage.accessToken = state.accessToken;
                localStorage.refreshToken = state.refreshToken;
            }
        })
        .addCase(auth.getRegisterFailed, (state, action) => {
            state.hasError.register = true;
            state.error = action.payload;
        })
        .addCase(auth.getLoginSuccess, (state, action) => {
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
        .addCase(auth.getLoginFailed, (state, action) => {
            state.hasError.login = true;
            state.error = action.payload;
        })
        .addCase(auth.getUserSuccess, (state, action) => {
            if (action.payload.success === true) {
                state.user = action.payload.user;
            }
        })
        .addCase(auth.getUserUpdateSuccess, (state) => {
            state.hasError.updateUser = false;
        })
        .addCase(auth.getUserUpdateFailed, (state, action) => {
            state.hasError.updateUser = true;
            state.error = action.payload;
        })
        .addCase(auth.setUser, (state, action) => {
            state.user = action.payload;
        })
        .addCase(auth.checkedAuth, (state) => {
            state.authChecked = true;
        });
});

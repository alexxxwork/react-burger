/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { createReducer } from '@reduxjs/toolkit';
import {
    getOrderRequest,
    getOrderSuccess,
    getOrderFailed,
    getOrderClear,
} from '../actions';

export const initialState = {
    isLoading: false,
    hasError: false,
    data: null,
    error: null,
};

export const orderReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getOrderRequest, (state) => {
            state.isLoading = true;
        })
        .addCase(getOrderSuccess, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        })
        .addCase(getOrderFailed, (state) => {
            state.isLoading = false;
            state.hasError = true;
            state.data = null;
        })
        .addCase(getOrderClear, (state) => {
            state.data = null;
        });
});

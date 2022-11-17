/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';

import { getOrderRequest, getOrderSuccess, getOrderFailed } from '../actions';

export const initialState = {
    isLoading: false,
    hasError: false,
    data: {},
    error: null,
};

export const orderReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getOrderRequest, (state) => {
            state.isLoading = true;
        })
        .addCase(getOrderSuccess, (state, action) => {
            // if (action.payload.length) {
            state.data = action.payload;
            state.isLoading = false;
            // }
        })
        .addCase(getOrderFailed, (state) => {
            state.isLoading = false;
            state.hasError = true;
            state.data = {};
        });
});

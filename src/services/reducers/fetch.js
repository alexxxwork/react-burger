/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import {
    getItemRequest,
    getItemsSuccess,
    getItemsFailed,
} from '../actions/get-items';

export const initialState = {
    isLoading: false,
    hasError: false,
    data: [],
};

export const fetchReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getItemRequest, (state) => {
            state.isLoading = true;
        })
        .addCase(getItemsSuccess, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(getItemsFailed, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.data = [];
            state.error = action.payload;
        });
});

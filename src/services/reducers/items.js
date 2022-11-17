/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import {
    getItemRequest,
    getItemsSuccess,
    getItemsFailed,
    addItem,
    moveItem,
    setCurrentItem,
} from '../actions';
import { BUN_NAME } from '../../utils/constants';

export const initialState = {
    isLoading: false,
    hasError: false,
    data: [],
    currentItem: null,
    bun: null,
    ingredients: [],
    error: null,
};

export const itemsReducer = createReducer(initialState, (builder) => {
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
        })
        .addCase(setCurrentItem, (state, action) => {
            state.currentItem = action.payload;
        })
        .addCase(moveItem, (state, action) => {
            state.ingredients.splice(
                action.payload.toIndex,
                0,
                state.ingredients.splice(action.payload.fromIndex, 1)[0]
            );
        })
        .addCase(addItem, (state, action) => {
            if (action.payload.type === BUN_NAME) state.bun = action.payload;
            else state.ingredients.push({ ...action.payload, id: uuid() });
        });
});

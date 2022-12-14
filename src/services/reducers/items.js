/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import {
    addItem,
    moveItem,
    deleteItem,
    clearItems,
    setCurrentItem,
    showModal,
} from '../actions';
import { BUN_NAME } from '../../utils/constants';

export const initialState = {
    currentItem: null,
    bun: null,
    ingredients: [],
    error: null,
    showModal: false,
};

export const itemsReducer = createReducer(initialState, (builder) => {
    builder
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
        .addCase(deleteItem, (state, action) => {
            if (typeof action.payload === 'number')
                state.ingredients.splice(action.payload, 1);
        })
        .addCase(addItem, (state, action) => {
            if (action.payload.type === BUN_NAME) state.bun = action.payload;
            else state.ingredients.push(action.payload);
        })
        .addCase(showModal, (state, action) => {
            state.showModal = action.payload;
        })
        .addCase(clearItems, (state) => {
            state.bun = null;
            state.ingredients = [];
        });
});

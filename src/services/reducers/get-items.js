/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { getItemRequest, getItemsSuccess, getItemsFailed } from '../actions';
import { API_URL } from '../../utils/constants';

export const initialState = {
    isLoading: false,
    hasError: false,
    data: [],
};
export function getItems() {
    return (dispatch) => {
        dispatch(getItemRequest);
        fetch(API_URL)
            .then(async (res) => {
                if (!res.ok) {
                    const json = await res.json();
                    throw new Error(json);
                }
                return res.json();
            })
            .then((data) => {
                dispatch(getItemsSuccess(data.data));
            })
            .catch((err) => {
                dispatch(getItemsFailed(err));
            });
    };
}

export const getItemsReducer = createReducer(initialState, (builder) => {
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

/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { createReducer } from '@reduxjs/toolkit';
import { ORDER_URL } from '../../utils/constants';
import { getOrderRequest, getOrderSuccess, getOrderFailed } from '../actions';

export const initialState = {
    isLoading: false,
    hasError: false,
    data: null,
    error: null,
};
export function getOrder(bun, ingredients) {
    return (dispatch) => {
        dispatch(getOrderRequest);
        fetch(ORDER_URL, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                bun
                    ? {
                          ingredients: [
                              bun._id,
                              ...ingredients.map((i) => i._id),
                              bun._id,
                          ],
                      }
                    : {
                          ingredients: [...ingredients.map((i) => i._id)],
                      }
            ),
        })
            .then(async (res) => {
                if (!res.ok) {
                    const json = await res.json();
                    throw new Error(json);
                }
                return res.json();
            })
            .then((data) => {
                dispatch(getOrderSuccess(data));
            })
            .catch((err) => {
                dispatch(getOrderFailed(err));
            });
    };
}
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
        });
});

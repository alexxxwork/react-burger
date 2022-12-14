/* eslint-disable no-underscore-dangle */
import { createAction } from '@reduxjs/toolkit';
import { checkResponse } from '../../utils/api';
import { ORDER_URL } from '../../utils/constants';

export const getOrderRequest = createAction('order/GET_REQUEST');
export const getOrderSuccess = createAction('order/GET_SUCCESS');
export const getOrderFailed = createAction('order/GET_FAILED');
export const getOrderClear = createAction('order/GET_CLEAR');
export const clearItems = createAction('order/clear');

export function getOrder(bun, ingredients) {
    return (dispatch) => {
        dispatch(getOrderRequest());
        fetch(ORDER_URL, {
            method: 'post',
            mode: 'cors',
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
            .then(checkResponse)
            .then((data) => {
                dispatch(getOrderSuccess(data));
                dispatch(clearItems());
            })
            .catch((err) => {
                dispatch(getOrderFailed(err));
            });
    };
}

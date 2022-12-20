/* eslint-disable no-underscore-dangle */
import { createAction } from '@reduxjs/toolkit';
import { request } from '../../utils/api';
import { ORDER_URL } from '../../utils/constants';
import { clearItems } from '.';

export const getOrderRequest = createAction('order/GET_REQUEST');
export const getOrderSuccess = createAction('order/GET_SUCCESS');
export const getOrderFailed = createAction('order/GET_FAILED');
export const getOrderClear = createAction('order/GET_CLEAR');

export function getOrder(bun, ingredients) {
    return (dispatch) => {
        dispatch(getOrderRequest());
        const { accessToken } = localStorage;
        if (accessToken)
            request(ORDER_URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
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
                .then((data) => {
                    dispatch(getOrderSuccess(data));
                    dispatch(clearItems());
                })
                .catch((err) => {
                    dispatch(getOrderFailed(err));
                });
    };
}

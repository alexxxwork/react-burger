/* eslint-disable no-underscore-dangle */
import { createAction } from '@reduxjs/toolkit';
import { ORDER_URL } from '../../utils/constants';

export const getOrderRequest = createAction('order/GET_REQUEST');
export const getOrderSuccess = createAction('order/GET_SUCCESS');
export const getOrderFailed = createAction('order/GET_FAILED');

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

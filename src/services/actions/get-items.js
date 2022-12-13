import { createAction } from '@reduxjs/toolkit';
import { API_URL } from '../../utils/constants';

export const getItemRequest = createAction('items/GET_REQUEST');
export const getItemsSuccess = createAction('items/GET_SUCCESS');
export const getItemsFailed = createAction('items/GET_FAILED');

export function getItems() {
    return (dispatch) => {
        dispatch(getItemRequest());
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

import { createAction } from '@reduxjs/toolkit';
import { checkResponse } from '../../utils/api';
import { API_URL } from '../../utils/constants';

export const getItemRequest = createAction('items/GET_REQUEST');
export const getItemsSuccess = createAction('items/GET_SUCCESS');
export const getItemsFailed = createAction('items/GET_FAILED');

export function getItems() {
    return (dispatch, getStore) => {
        if (!getStore().data) {
            dispatch(getItemRequest());
            fetch(API_URL, {
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
                .then(checkResponse)
                .then((data) => {
                    dispatch(getItemsSuccess(data.data));
                })
                .catch((err) => {
                    dispatch(getItemsFailed(err));
                });
        }
    };
}

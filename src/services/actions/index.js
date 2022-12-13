import { createAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

export const getItemRequest = createAction('items/GET_REQUEST');
export const getItemsSuccess = createAction('items/GET_SUCCESS');
export const getItemsFailed = createAction('items/GET_FAILED');
export const moveItem = createAction('items/move_item');
export const deleteItem = createAction('items/delete_item');
export const setCurrentItem = createAction('items/set_current');
export const addItem = createAction('items/add_item', (item) => ({
    payload: {
        ...item,
        id: uuid(),
    },
}));

export const getOrderRequest = createAction('order/GET_REQUEST');
export const getOrderSuccess = createAction('order/GET_SUCCESS');
export const getOrderFailed = createAction('order/GET_FAILED');

export const getPasswordResetSuccess = createAction(
    'passwordReset/GET_SUCCESS'
);
export const getPasswordResetFailed = createAction('passwordReset/GET_FAILED');
export const getPasswordRestoreSuccess = createAction(
    'passwordRestore/GET_SUCCESS'
);
export const getPasswordRestoreFailed = createAction(
    'passwordRestore/GET_FAILED'
);
export const getRegisterSuccess = createAction(
    'register/GET_SUCCESS',
    (item) => ({
        payload: {
            ...item,
            accessToken: item.accessToken.replace('Bearer ', ''),
        },
    })
);
export const getRegisterFailed = createAction('register/GET_FAILED');

export const getLoginSuccess = createAction('login/GET_SUCCESS', (item) => ({
    payload: {
        ...item,
        accessToken: item.accessToken.replace('Bearer ', ''),
    },
}));
export const getLoginFailed = createAction('login/GET_FAILED');

export const getUserSuccess = createAction('user/GET_SUCCESS');
export const getUserFailed = createAction('user/GET_FAILED');
export const setUser = createAction('user/set');
export const showModal = createAction('items/SHOW_MODAL');

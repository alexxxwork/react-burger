import { createAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import {
    getItemRequest,
    getItemsSuccess,
    getItemsFailed,
    getItems,
} from './get-items';
import {
    getOrder,
    getOrderRequest,
    getOrderSuccess,
    getOrderFailed,
} from './get-order';
import {
    getLogin,
    getPasswordResetSuccess,
    getPasswordResetFailed,
    getPasswordRestoreSuccess,
    getPasswordRestoreFailed,
    getRegisterSuccess,
    getRegisterFailed,
    getLoginSuccess,
    getLoginFailed,
    getUserSuccess,
    getUserFailed,
    getUser,
    setUser,
    patchUser,
    getResetPassword,
    getRestorePassword,
    getRegister,
    getLogout,
} from './password-functions';

export { getItemRequest, getItemsSuccess, getItemsFailed, getItems };
export { getOrder, getOrderRequest, getOrderSuccess, getOrderFailed };
export {
    getResetPassword,
    getRestorePassword,
    getRegister,
    getLogin,
    getLogout,
    getUser,
    patchUser,
    getPasswordResetSuccess,
    getPasswordResetFailed,
    getPasswordRestoreSuccess,
    getPasswordRestoreFailed,
    getRegisterSuccess,
    getRegisterFailed,
    getLoginSuccess,
    getLoginFailed,
    getUserSuccess,
    getUserFailed,
    setUser,
};

export const moveItem = createAction('items/move_item');
export const deleteItem = createAction('items/delete_item');
export const setCurrentItem = createAction('items/set_current');
export const addItem = createAction('items/add_item', (item) => ({
    payload: {
        ...item,
        id: uuid(),
    },
}));

export const showModal = createAction('items/SHOW_MODAL');

import { createAction } from '@reduxjs/toolkit';

export const getItemRequest = createAction('items/GET_REQUEST');
export const getItemsSuccess = createAction('items/GET_SUCCESS');
export const getItemsFailed = createAction('items/GET_FAILED');
export const addItem = createAction('items/add_item');
export const moveItem = createAction('items/move_item');
export const deleteItem = createAction('items/delete_item');
export const setCurrentItem = createAction('items/set_current');

export const getOrderRequest = createAction('order/GET_REQUEST');
export const getOrderSuccess = createAction('order/GET_SUCCESS');
export const getOrderFailed = createAction('order/GET_FAILED');

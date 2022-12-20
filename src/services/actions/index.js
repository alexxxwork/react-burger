import { createAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import * as items from './get-items';
import * as auth from './auth-functions';

export { items, auth };

export const moveItem = createAction('items/move_item');
export const deleteItem = createAction('items/delete_item');
export const setCurrentItem = createAction('items/set_current');
export const clearItems = createAction('order/clear');

export const addItem = createAction('items/add_item', (item) => ({
    payload: {
        ...item,
        id: uuid(),
    },
}));

export const showModal = createAction('items/SHOW_MODAL');

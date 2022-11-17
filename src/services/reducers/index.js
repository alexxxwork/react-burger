/* eslint-disable no-underscore-dangle */
import { combineReducers } from 'redux';
import {
    getItemRequest,
    getItemsSuccess,
    getItemsFailed,
    getOrderRequest,
    getOrderSuccess,
    getOrderFailed,
} from '../actions';
import { API_URL, ORDER_URL } from '../../utils/constants';
import { itemsReducer } from './items';
import { orderReducer } from './order';

export const initialState = {
    order: {
        data: [],
        isLoading: false,
        hasError: false,
    },
    error: null,
};

export function getItems() {
    return (dispatch) => {
        dispatch(getItemRequest);
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

export const rootReducer = combineReducers({
    items: itemsReducer,
    order: orderReducer,
});

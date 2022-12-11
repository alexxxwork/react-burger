import { combineReducers } from 'redux';
import { itemsReducer } from './items';
import { getItemsReducer } from './get-items';
import { orderReducer } from './order';
import { getPasswordReducer } from './password-functions';

const rootReducer = combineReducers({
    items: itemsReducer,
    order: orderReducer,
    fetch: getItemsReducer,
    password: getPasswordReducer,
});

export default rootReducer;

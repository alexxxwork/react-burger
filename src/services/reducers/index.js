import { combineReducers } from 'redux';
import { itemsReducer } from './items';
import { fetchReducer } from './fetch';
import { orderReducer } from './order';
import { getPasswordReducer } from './password';

const rootReducer = combineReducers({
    items: itemsReducer,
    order: orderReducer,
    fetch: fetchReducer,
    password: getPasswordReducer,
});

export default rootReducer;

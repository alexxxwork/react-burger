import { combineReducers } from 'redux';
import { itemsReducer } from './items';
import { fetchReducer } from './fetch';
import { orderReducer } from './order';
import { getAuthReducer } from './auth';

const rootReducer = combineReducers({
    items: itemsReducer,
    order: orderReducer,
    fetch: fetchReducer,
    auth: getAuthReducer,
});

export default rootReducer;

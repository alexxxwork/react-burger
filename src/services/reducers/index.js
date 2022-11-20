import { combineReducers } from 'redux';
import { itemsReducer } from './items';
import { getItemsReducer } from './get-items';
import { orderReducer } from './order';

const rootReducer = combineReducers({
    items: itemsReducer,
    order: orderReducer,
    fetch: getItemsReducer,
});

export default rootReducer;

import { 
    CHANGE_USER, TRADES_LOADED, 
    PENDING_ORDERS_LOADED, 
    MY_ORDERS_LOADED, 
    MARKET_DEPTH_LOADED 
} from '../constants/action-types';
// coudl refactor this to import * from 

export const changeUser = payload => ({ type: CHANGE_USER, payload });
export const getMarketDepth = data => ({ type: MARKET_DEPTH_LOADED, payload: data});
export const getMyOrders = data => ({ type: MY_ORDERS_LOADED, payload: data});
export const getPendingOrders = data => ({ type: PENDING_ORDERS_LOADED, payload: data});
export const getTrades = data => ({ type: TRADES_LOADED, payload: data});

import { CHANGE_USER }  from "../constants/action-types";
import { TRADES_LOADED } from "../constants/action-types";
import { PENDING_ORDERS_LOADED } from "../constants/action-types";
import { MY_ORDERS_LOADED } from "../constants/action-types";
import { MARKET_DEPTH_LOADED } from "../constants/action-types";

export const changeUser = payload => ({ type: CHANGE_USER, payload });
export const getMarketDepth = data => ({ type: MARKET_DEPTH_LOADED, payload: data});
export const getMyOrders = data => ({ type: MY_ORDERS_LOADED, payload: data});
export const getPendingOrders = data => ({ type: PENDING_ORDERS_LOADED, payload: data});
export const getTrades = data => ({ type: TRADES_LOADED, payload: data});

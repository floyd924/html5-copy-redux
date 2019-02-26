import {combineReducers} from 'redux';
import { reducer as example } from './ducks/example';
//import { NAME_OF_ARRIVING_COMMAND } from "here";
import { TRADES_LOADED } from "../constants/action-types";
import { PENDING_ORDERS_LOADED } from "../constants/action-types";
import { MY_ORDERS_LOADED } from "../constants/action-types";
import { CHANGE_USER } from "../constants/action-types";


const initialState = {
    user: [],
    trades: [],
    myOrders: [],
    pendingOrders: []
}

function rootReducer(state = initialState, action){

    switch (action.type) {
        case TRADES_LOADED:
            console.log("Trades loaded has been called in the root with poayload:", action.payload)
            return Object.assign({}, state, {
                trades: state.trades.concat(action.payload)
            });


        case MY_ORDERS_LOADED:
            return Object.assign({}, state, {
                myOrders: state.myOrders.concat(action.payload)
            });


        case PENDING_ORDERS_LOADED:
        console.log("called now", action.payload)
            return Object.assign({}, state, {
                pendingOrders: state.pendingOrders.concat(action.payload)
            });


        case CHANGE_USER:
            return Object.assign({}, state, {
                user: state.user.concat(action.payload)
            });


        default:
        return state;

    }
}

export default rootReducer;



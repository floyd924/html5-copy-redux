import {combineReducers} from 'redux';
import { reducer as example } from './ducks/example';
//import { NAME_OF_ARRIVING_COMMAND } from "here";
import { TRADES_LOADED } from "../Constants/action-types";


const initialState = {
    user: [],
    trades: ["iain", "benj", "steve"]
}

function rootReducer(state = initialState, action){
    if (action.type === TRADES_LOADED) {
        return Object.assign({}, state, {
            trades: state.trades.concat(action.payload)
        });
    }

    if (action.type === "NAME_OF_FUNCTIONN"){
        return Object.assign({}, state, {
            remoteArticles: state.remoteArticles.concat(action.payload)
        });
    } 
    return state;
}

export default rootReducer;




// // export function changeUser(payload){
// //     return {type: "CHANGE_USER", payload}
// // };

// // export function getTrades(payload){
// //     //this returns a promise
// //     //use thunk
// // };

// // export function getPendingOrders(payload){
// //     //this returns a promise
// //     //use thunk
// // };

// // export function getMyOrders(payload){
// //     //this returns a promise
// //     //use thunk
// // };

// // export function postNewOrder(payload){
// //     //this returns a promise
// //     //use thunk
// // }

// const rootReducer = combineReducers({ example });
// export default rootReducer;



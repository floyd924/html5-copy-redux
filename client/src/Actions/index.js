import { CHANGE_USER }  from "../Constants/action-types";
import { TRADES_LOADED } from "../Constants/action-types";
import { PENDING_ORDERS_LOADED } from "../Constants/action-types";
import { MY_ORDERS_LOADED } from "../Constants/action-types";
import { MARKET_DEPTH_LOADED } from "../Constants/action-types";



const fetch = require('node-fetch');
const url = "http://localhost:3001";

const fetchAndDispatch = function(dispatch, path, command) {
    return fetch(path)
    .then(res => res.json())
    .then(json => dispatch({ type: command, payload: json}));
}

export const changeUser = payload => ({ type: CHANGE_USER, payload });


export function getTrades(){
    return function(dispatch) {
        fetchAndDispatch(dispatch, `${url}/trades`, TRADES_LOADED)
    };
};
export function getMarketDepth(){
    return function(dispatch) {
        fetchAndDispatch(dispatch, `${url}/depth`, MARKET_DEPTH_LOADED)
    };
};


export function getPendingOrders(){
    return function (dispatch){
        fetchAndDispatch(dispatch, `${url}/orders`, PENDING_ORDERS_LOADED)
    }
};


export function getMyOrders(name){
    return function(dispatch){
        fetchAndDispatch(dispatch, `${url}/users/${name}`, MY_ORDERS_LOADED)
    }
};


export function postNewOrder(payload){
    return function(){
        return fetch(`${url}/orders`, {
            method: 'POST',
            mode: 'CORS',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
    }
}

// export function getMarketDepth(){
//     return function (dispatch){
//         fetchAndDispatch(dispatch, `${url}/depth`, MARKET_DEPTH_LOADED)
//     }
// }
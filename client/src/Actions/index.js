import { CHANGE_USER }  from "../constants/action-types";
import { TRADES_LOADED } from "../constants/action-types";
import { PENDING_ORDERS_LOADED } from "../constants/action-types";
import { MY_ORDERS_LOADED } from "../constants/action-types";



const fetch = require('node-fetch');

export const changeUser = payload => ({ type: CHANGE_USER, payload });


export function getTrades(){
    return function(dispatch) {
        return fetch("http://localhost:3001/trades")
        .then(res => res.json())
        .then(json => dispatch({ type: TRADES_LOADED, payload: json }));
    };
};


export function getPendingOrders(){
    return function (dispatch){
        return fetch("http://localhost:3001/orders")
        .then(res => res.json())
        .then(json => dispatch({ type: PENDING_ORDERS_LOADED, payload: json }));
    }
};


export function getMyOrders(name){
    return function(dispatch){
        return fetch(`http://localhost:3001/users/${name}`)
        .then(res => res.json())
        .then(json => dispatch({ type: MY_ORDERS_LOADED, payload: json }));
    }
};


export function postNewOrder(payload){
    return function(){
        return fetch("http://localhost:3001/orders", {
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
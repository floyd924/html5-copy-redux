import { CHANGE_USER }  from "../Constants/action-types";
import { GET_TRADES }  from "../Constants/action-types";
import { TRADES_LOADED } from "../Constants/action-types";
import { GET_PENDING_ORDERS }  from "../Constants/action-types";
import { GET_MY_ORDERS }  from "../Constants/action-types";
import { POST_NEW_ORDER }  from "../Constants/action-types";
//TRADES_LOADED

const fetch = require('node-fetch');

//we are not going to do the 'get state' methods just now

export function changeUser(payload){
    return {type: CHANGE_USER, payload}
};

export function getTrades(){
    return function(dispatch) {
        return fetch("http://localhost:3001/trades")
        // return fetch("https://api.punkapi.com/v2/beers")
        // .then("we are here now again")
        .then(res => res.json())
        // .then(json => {
        //     dispatch({ type: TRADES_LOADED, payload: json });
        // });
    };
};

//currently only getting and returning data
//not forwarding to the store
export function getPendingOrders(payload){
    return function (dispatch){
        return fetch("http://localhost:3001/orders")
        .then(res => res.json())
        // .then(json => {
        //     dispatch({ type: TRADES_LOADED, payload: json });
        // });
    }
};

//currently only getting and returning data
//not forwarding to the store
export function getMyOrders(payload){
    return function(dispatch){
        return fetch("http://localhost:3001/users/iain")
        .then(res => res.json())
        // .then(json => {
        //     dispatch({ type: TRADES_LOADED, payload: json });
        // });
    }
};

//currently only getting and returning data
//not forwarding to the store
export function postNewOrder(payload){
    //this returns a promise
    //use thunk
    return function(dispatch){
        return fetch("http://localhost:3001/orders", {
            method: 'POST',
            mode: 'CORS',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }).then(res => {
            return res
        })
    }
}
import { CHANGE_USER }  from "../constants/action-types";
import { GET_TRADES }  from "../constants/action-types";
import { TRADES_LOADED } from "../constants/action-types";
import { GET_PENDING_ORDERS }  from "../constants/action-types";
import { GET_MY_ORDERS }  from "../constants/action-types";
import { POST_NEW_ORDER }  from "../constants/action-types";
//TRADES_LOADED

const fetch = require('node-fetch');

//we are not going to do the 'get state' methods just now

export function changeUser(payload){
    return {type: CHANGE_USER, payload}
};

export function getTrades(){
    return function(dispatch) {
        return fetch("http://localhost:3001/trades")
        .then(res => res.json())
        //uncomment this block to call the TRADES_LAODED section in the root.js. It kills the 'this.state' in Recents.js though
        .then(json => {
            dispatch({ type: TRADES_LOADED, payload: json });
        });
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


//not forwarding to the store
export function postNewOrder(payload){
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
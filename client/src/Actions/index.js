import { CHANGE_USER }  from "../Constants/action-types";
import { GET_TRADES }  from "../Constants/action-types";
import { GET_PENDING_ORDERS }  from "../Constants/action-types";
import { GET_MY_ORDERS }  from "../Constants/action-types";
import { POST_NEW_ORDER }  from "../Constants/action-types";

//we are not going to do the 'get state' methods just now

export function changeUser(payload){
    return {type: CHANGE_USER, payload}
};

export function getTrades(payload){
    //this returns a promise
    //use thunk
};

export function getPendingOrders(payload){
    //this returns a promise
    //use thunk
};

export function getMyOrders(payload){
    //this returns a promise
    //use thunk
};

export function postNewOrder(payload){
    //this returns a promise
    //use thunk
}
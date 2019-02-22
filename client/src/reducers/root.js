import {combineReducers} from 'redux';
import { reducer as example } from './ducks/example';





// export function changeUser(payload){
//     return {type: "CHANGE_USER", payload}
// };

// export function getTrades(payload){
//     //this returns a promise
//     //use thunk
// };

// export function getPendingOrders(payload){
//     //this returns a promise
//     //use thunk
// };

// export function getMyOrders(payload){
//     //this returns a promise
//     //use thunk
// };

// export function postNewOrder(payload){
//     //this returns a promise
//     //use thunk
// }

const rootReducer = combineReducers({ example });
export default rootReducer;
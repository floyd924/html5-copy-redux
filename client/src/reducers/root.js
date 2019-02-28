import { TRADES_LOADED } from "../constants/action-types";
import { PENDING_ORDERS_LOADED } from "../constants/action-types";
import { MY_ORDERS_LOADED } from "../constants/action-types";
import { CHANGE_USER } from "../constants/action-types";


const initialState = {
    user: ["iain"],
    trades: [],
    myOrders: [],
    pendingOrders: []
}

function rootReducer(state = initialState, action){

    switch (action.type) {
        case TRADES_LOADED:
            return Object.assign({}, state, {
                trades: state.trades.concat(action.payload)
            });


        case MY_ORDERS_LOADED:
            return Object.assign({}, state, {
                myOrders: state.myOrders.slice(0, 0).concat(action.payload)
            })


        case PENDING_ORDERS_LOADED:
            return Object.assign({}, state, {
                pendingOrders: state.pendingOrders.concat(action.payload)
            });


        case CHANGE_USER:
            const newObject2 = Object.assign({}, state, {
                user: getNewUser(initialState.user, action)
            })
            return newObject2;
            


        default:
        return state;

    }
}


function getNewUser(oldState, act){
    let newUser = oldState.slice(0, 0)
    newUser.push(act.payload.name);
    return newUser
};

export default rootReducer;




 
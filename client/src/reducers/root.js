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
        //TODO: solve this:
        //.slice(0,0) creates a copy that is empty
        //these throw errors if i change .concat to .push
        case TRADES_LOADED:
            return  {...state, 
                trades: state.trades.slice(0,0).concat(action.payload)
            };


        case MY_ORDERS_LOADED:
            return { ...state, 
                myOrders: state.myOrders.slice(0, 0).concat(action.payload)
            };


        case PENDING_ORDERS_LOADED:
            return { ...state, 
                pendingOrders: state.pendingOrders.slice(0,0).concat(action.payload)
            };


        case CHANGE_USER:
            return { ...state,
                user: getNewUser(initialState.user, action)
            };
            


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




 
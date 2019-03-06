import { TRADES_LOADED } from "../constants/action-types";
import { PENDING_ORDERS_LOADED } from "../constants/action-types";
import { MY_ORDERS_LOADED } from "../constants/action-types";
import { CHANGE_USER } from "../constants/action-types";


const initialState = {
    user: "default",
    trades: [],
    myOrders: [],
    pendingOrders: []
}

function rootReducer(state = initialState, action){

    switch (action.type) {
        case TRADES_LOADED:
            return  {...state, 
                trades: action.payload
            };


        case MY_ORDERS_LOADED:
            return { ...state, 
                myOrders: action.payload
            };


        case PENDING_ORDERS_LOADED:
            return { ...state, 
                pendingOrders: action.payload
            };


        case CHANGE_USER:
            return { ...state,
                user: action.payload.name
            };
            


        default:
        return state;

    }
}


export default rootReducer;




 
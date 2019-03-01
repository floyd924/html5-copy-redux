import { TRADES_LOADED } from "../constants/action-types";
import { PENDING_ORDERS_LOADED } from "../constants/action-types";
import { MY_ORDERS_LOADED } from "../constants/action-types";
import { CHANGE_USER } from "../constants/action-types";


const initialState = {
    user: ["default"],
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
        console.log("trades are being overwritten with new stuff:")
            return  {...state, 
                trades: action.payload
            };


        case MY_ORDERS_LOADED:
        console.log("myOrders is being overwritten")
            return { ...state, 
                myOrders: action.payload
                // myOrders: state.myOrders.slice(0, 0).concat(action.payload)
            };


        case PENDING_ORDERS_LOADED:
        console.log("pending orders are being overwritten with new stuff:", action.payload)
            return { ...state, 
                pendingOrders: action.payload
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




 
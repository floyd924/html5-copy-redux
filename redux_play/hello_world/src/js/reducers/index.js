import { ADD_ARTICLE } from "../constants/action-types";
import { FOUND_BAD_WORD } from "../constants/action-types";

const initialState = {
    articles: []
}

function rootReducer(state = initialState, action){
    if (action.type === ADD_ARTICLE) {
        return Object.assign({}, state, {
            articles: state.articles.concat(action.payload)
        })
    }
    if (action.type === FOUND_BAD_WORD){
        console.log("bad word here")
    }
    return state;
}

export default rootReducer;
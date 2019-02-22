import rootReducer from '../reducers/root';
import {createStore} from 'redux';


export default (initialState) => {
  return createStore(rootReducer, initialState);
};


// import { createStore, applyMiddleware } from "redux";
// import rootReducer from "../reducers/index";
// // import { middleWareGoesHere } from "../middleware/whatever";

// const store = createStore(rootReducer, applyMiddleware(middleWareGoesHere));
// export default store;




import rootReducer from '../reducers/root';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

// export default (initialState) => {
//     const createStoreWithSaga = applyMiddleware( 
//         sagaMiddleware([rootSaga])
//       )(createStore);      
//     return createStoreWithSaga(rootReducer, initialState,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// };

export default (initialState) => {
    const sagaMiddleware = createSagaMiddleware()
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return {
        ...createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(sagaMiddleware))),
        runSaga: sagaMiddleware.run
    }
    // const createStoreWithSaga = applyMiddleware( 
    //     sagaMiddleware([rootSaga])
    //   )(createStore);      
    // return createStoreWithSaga(rootReducer, initialState,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
};
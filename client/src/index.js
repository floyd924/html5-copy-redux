import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import {Provider} from 'react-redux';
import io from 'socket.io-client'
import { updateOrderBook, updateTradeBook, updateMarketAverage, updatePrivateOrderBook } from './actions/orderActions';
import { windowResized } from './actions/windowResizedAction';

import './index.css';

import configureStore from './store/configure-store';

const store = configureStore({ example: { 
    name: 'Joe Bloggs',
    accountId: 4,
    allAccounts: [{
        id: 1,
        name: 'Account 1'
    },{
        id: 2,
        name: 'Account 2'
    },{
        id: 3,
        name: 'Account 3'
    },{
        id: 4,
        name: 'Default Account'
    }],
    selectedAction: 'BUY',
    orderBook: [],
    privateOrderBook: [],
    tradeBook: [],
    marketAverage: 0,
    viewPrivate: false,
    windowResized: Date.now(),
}});

store.dispatch({
    type: 'example/CHANGE_NAME',
    name: "Ivan Mladjenovic"
})

window.addEventListener('resize', () => {
    store.dispatch(windowResized());
});

var clientSocket = io('91.224.190.163:4000');
clientSocket.emit('requestOrderBook', {private: true, accountId: 4});
clientSocket.emit('requestOrderBook', {private: false, accountId: 4});
clientSocket.emit('requestTradeBook', 0);

clientSocket.on("orderBook", function(data){
    store.dispatch(updateOrderBook(data));
});

clientSocket.on("orderBookPrivate", function(data){
    store.dispatch(updatePrivateOrderBook(data));
});

clientSocket.on("tradeBook", function(data){
    store.dispatch(updateTradeBook(data));
});

clientSocket.on("marketAverage", function(data){
    store.dispatch(updateMarketAverage(data));
});
// Web socket things
// var clientSocket = io('http://localhost:4000/');

// const sendOrder = function(id, price, quantity, actionType) {
//     const data = {
//         account: id,
//         price: price,
//         quantity: quantity,
//         action: actionType
//     }
//     clientSocket.emit('placeOrder', data);
// }

// var buyOrder1 = {account: 1, price: 100, quantity: 100, action: 'BUY'};
// var buyOrder2 = {account: 2, price: 150, quantity: 50, action: 'BUY'};
// var sellOrder1 = {account: 3, price: 100, quantity: 100, action: 'SELL'};

// clientSocket.on('connect', function () {
    // clientSocket.emit('placeOrder', buyOrder1);
    // clientSocket.emit('placeOrder', buyOrder2);
    // clientSocket.emit('placeOrder', sellOrder1);
//     clientSocket.emit('requestOrderBook', 0);
// });

ReactDOM.render(
    <Provider store={store}>
        <AppContainer className="container-fluid" />
    </Provider>,
    document.getElementById('root')
);

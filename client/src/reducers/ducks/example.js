// DUCKS - Redux Reducer Bundles - https://github.com/erikras/ducks-modular-redux#example

// var addons = require('react-addons');

// Actions
const CHANGE_NAME = 'example/CHANGE_NAME';
const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';
const CHANGE_ACTION_TYPE = 'CHANGE_ACTION_TYPE';
const UPDATE_ORDER_BOOK = 'UPDATE_ORDER_BOOK';
const UPDATE_TRADE_BOOK = 'UPDATE_TRADE_BOOK';
const UPDATE_MARKET_AVERAGE = 'UPDATE_MARKET_AVERAGE';
const TOGGLE_PRIVATE = 'TOGGLE_PRIVATE';
const UPDATE_PRIVATE_ORDER_BOOK = 'UPDATE_PRIVATE_ORDER_BOOK';
const WINDOW_RESIZED = 'WINDOW_RESIZED';

// Reducer
export function reducer(state = {}, action = {}) {
    switch (action.type) {
        case CHANGE_NAME:
            return { ...state, name: action.name };
        case CHANGE_ACCOUNT:
            return { ...state, accountId: action.accountId };
        case CHANGE_ACTION_TYPE:
            return { ...state, selectedAction: action.selectedAction };
        case UPDATE_ORDER_BOOK:
            return { ...state, orderBook: action.orderBook};
        case UPDATE_TRADE_BOOK:
            return { ...state, tradeBook: action.tradeBook};
        case UPDATE_MARKET_AVERAGE:
                return { ...state, marketAverage: action.marketAverage };
        case WINDOW_RESIZED:
                return { ...state, windowResized: action.timestamp }
        case TOGGLE_PRIVATE:
                return { ...state, viewPrivate: !(state.viewPrivate) };
        case UPDATE_PRIVATE_ORDER_BOOK:
                return { ...state, privateOrderBook: action.privateOrderBook };
        default:
            return state;
    }
}
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
const BITCOIN_API_FETCH_FAILED = 'BITCOIN_API_FETCH_FAILED';
// const REQUEST_BITCOIN_API = 'REQUEST_BITCOIN_API';
import { REQUEST_BITCOIN_API, MONITOR_LIVE_BITCOIN, BITCOIN_API_FETCH_SUCCEEDED } from '../../actions/bitCoinApi';

// Reducer
export function reducer(state = {}, action = {}) {
    switch (action.type) {
        case CHANGE_NAME:
            return { ...state, name: action.name };
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
        case BITCOIN_API_FETCH_SUCCEEDED:
                return { ...state,
                                bitCoinEURRate: action.payload.bpi.EUR.rate_float,
                                bitCoinUSDRate: action.payload.bpi.USD.rate_float,
                                bitCoinGBPRate: action.payload.bpi.GBP.rate_float,
                                bitCoinLastUpdated: action.payload.time.updateduk,
                                bitCoinJSON: action.payload,
                                sendApiFetch: false,
                        };
        case BITCOIN_API_FETCH_FAILED:
                return { ...state, message: action.message };
        case REQUEST_BITCOIN_API:
                return { ...state, sendApiFetch: action.value};
        case MONITOR_LIVE_BITCOIN:
                return { ...state, monitorLiveBitCoin: action.value };
        default:
            return state;
    }
}
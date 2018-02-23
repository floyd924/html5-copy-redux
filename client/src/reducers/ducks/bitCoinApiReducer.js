// DUCKS - Redux Reducer Bundles - https://github.com/erikras/ducks-modular-redux#example

// var addons = require('react-addons');

// Actions
const BITCOIN_API_FETCH_FAILED = 'BITCOIN_API_FETCH_FAILED';
import { REQUEST_BITCOIN_API, MONITOR_LIVE_BITCOIN, BITCOIN_API_FETCH_SUCCEEDED } from '../../actions/bitCoinApi';

// Reducer
export function reducer(state = {}, action = {}) {
    switch (action.type) {
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
        default:
            return state;
    }
}
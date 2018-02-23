export const REQUEST_BITCOIN_API = 'REQUEST_BITCOIN_API';
export const BITCOIN_API_FETCH_SUCCEEDED = 'BITCOIN_API_FETCH_SUCCEEDED';

export const requestBitCoinApi = value => ({
    type: REQUEST_BITCOIN_API,
    value,
});

export const receiveBitCoinApi = payload => ({
    type: BITCOIN_API_FETCH_SUCCEEDED,
    payload,
});
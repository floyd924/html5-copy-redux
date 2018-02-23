import { all, take, takeEvery, fork, call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { api } from '../services';
import { REQUEST_BITCOIN_API, MONITOR_LIVE_BITCOIN } from '../actions/bitCoinApi';
import { createEntity } from 'redux-json-api'

export function* fetchBitCoinApi() {
  try {
    const bitCoinJSON = yield call(api.fetchBitCoinApi);
    yield put({ type: 'BITCOIN_API_FETCH_SUCCEEDED', payload: bitCoinJSON });
  } catch (e) {
    yield put({type: "BITCOIN_API_FETCH_FAILED", message: e.message});
  }
}

export function* refreshBitCoinRequest() {
  yield takeEvery(REQUEST_BITCOIN_API, fetchBitCoinApi);
}

export function* repeatBitCoinRequest() {
  while(true) {
      yield delay(60000);
      yield fork(fetchBitCoinApi);
  }
}

export default function* root() {
    yield all([
        fork(repeatBitCoinRequest),
        fork(refreshBitCoinRequest),
    ])
}
import {combineReducers} from 'redux';
import { reducer as example } from './ducks/example';
import { reducer as account } from './ducks/accountOrderReducer';
import { reducer as formReducer } from 'redux-form';
import { reducer as bitCoinApi } from './ducks/bitCoinApiReducer';

const rootReducer = combineReducers({ example, form: formReducer, account, bitCoinApi });
export default rootReducer;
import {combineReducers} from 'redux';
import { reducer as example } from './ducks/example';

const rootReducer = combineReducers({ example });
export default rootReducer;
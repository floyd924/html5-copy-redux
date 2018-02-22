import {combineReducers} from 'redux';
import { reducer as example } from './ducks/example';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({ example, form: formReducer });
export default rootReducer;
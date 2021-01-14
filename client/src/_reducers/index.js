import { combineReducers } from 'redux';
import user from './user_reducer';
import value from './value_reducer'

const rootReducer = combineReducers({
    user,
    value
});

export default rootReducer;
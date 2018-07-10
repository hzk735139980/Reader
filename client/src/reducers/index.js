import { combineReducers } from 'redux';
import authReducer from './authReducer';
import contentReducer from './contentReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    cont: contentReducer
});
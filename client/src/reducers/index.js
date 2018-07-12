import { combineReducers } from 'redux';
import authReducer from './authReducer';
import contentReducer from './contentReducer';
import { reducer as formReducer } from 'redux-form';
import bookmarkReducer from './bookmarkReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    cont: contentReducer,
    mark: bookmarkReducer
});
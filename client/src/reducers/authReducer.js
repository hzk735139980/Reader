import { AUTH_USER, AUTH_ERROR, AUTH_SETTING } from '../actions/types';

const INITIAL_STATE = {
    authenticated: '',
    bgcolor: '',
    fontsize: '',
    errorMsg: ''
};

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case AUTH_USER:
            return { ...state, authenticated: action.payload };
        case AUTH_SETTING: 
            return { ...state, bgcolor: action.payload.bgcolor,
                fontsize: action.payload.fontsize };
        case AUTH_ERROR:
            return { ...state, errorMsg: action.payload };
        default:
            return state;
    }
}
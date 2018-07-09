import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const fetchuser = () => {
    // axios.get('/api/current_user', { headers: {'authorization': localStorage.getItem('token')} })
    // .then(function(res){
    //     console.log(res);
    //     dispatch( { type: FETCH_USER, payload: res.data.username });
    // })
    // .catch(function (error) {
    //     dispatch( { type: AUTH_ERROR, payload: error.response.data.error });
    // });
    return { type: AUTH_USER, payload: localStorage.getItem('token') };
}

export const signup = (formProps, callback) =>  dispatch => {
    axios.post('/api/signup', formProps)
    .then(function(res){
        dispatch( { type: AUTH_USER, payload: res.data.token });
        localStorage.setItem('token', res.data.token);
        callback();
    })
    .catch(function (error) {
        dispatch( { type: AUTH_ERROR, payload: error.response.data.error });
    });
}

export const signin = (formProps, callback) =>  dispatch => {
    axios.post('/api/signin', formProps)
    .then(function(res){
        dispatch( { type: AUTH_USER, payload: res.data.token });
        localStorage.setItem('token', res.data.token);
        callback();
    })
    .catch(function (error) {
        dispatch( { type: AUTH_ERROR, payload: 'Incorrect username or password' });
    });
}

export const signout = () => {
    localStorage.removeItem('token');
    return { type: AUTH_USER, payload: '' };
}
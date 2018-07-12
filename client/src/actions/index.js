import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, FETCH_CONTENT, CONTENT_ERROR, FETCH_BOOKMARK, DELETE_BOOKMARK, ADD_BOOKMARK, UPDATE_BOOKMARK, AUTH_SETTING } from './types';

// auth actions
export const fetchuser = () => dispatch => {
    axios.get('/api/current_user', { headers: {'authorization': localStorage.getItem('token')} })
    .then(function(res){
        dispatch( { type: AUTH_USER, payload: res.data, local: localStorage.getItem('token') });
    })
    .catch(function (error) {
        dispatch( { type: AUTH_ERROR, payload: error.response.data.error });
    });
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

//update user setting
export const updatesetting = (setProps, callback) => dispatch => {
    axios.put('/api/user/setting', setProps,
        { headers: { Authorization: localStorage.getItem('token')} })
    .then(function(res){
        dispatch({ type: AUTH_SETTING, payload: res.data });
        callback();
    })
}



// fetch content action
export const fetchcontent = (urlProps, callback) => dispatch => {
    axios.post('/api/getcontent', urlProps)
    .then(function(res){
        dispatch({ type: FETCH_CONTENT, payload: res.data });
        callback();
    })
    .catch(function(error){
        dispatch({ type: CONTENT_ERROR, payload: error.response.data.error });
    })
}


//bookmark part
export const fetchbookmark = () => dispatch => {
    axios.get('/api/bookmark/fetch',
        { headers: { Authorization: localStorage.getItem('token')} })
    .then(function(res){
        dispatch({ type: FETCH_BOOKMARK,  payload: res.data });
    })
};

export const deletebookmark = (idProps, callback) => dispatch => {
    axios.delete('/api/bookmark/delete',
        { headers: { Authorization: localStorage.getItem('token')},
          data: {id: idProps} })
    .then(function(res){
        dispatch({ type: DELETE_BOOKMARK,  payload: res.data });
        callback();
    })
}

export const addbookmark = (bookmarkProps) => dispatch => {
    axios.post('/api/bookmark/add', bookmarkProps,
        { headers: { Authorization: localStorage.getItem('token')}})
        .then(function(res){
            dispatch({ type: ADD_BOOKMARK,  payload: res.data });
        })
}

export const updatebookmark = (bookmarkProps) => dispatch => {
    axios.put('/api/bookmark/update', bookmarkProps,
        { headers: { Authorization: localStorage.getItem('token')}})
        .then(function(res){
            dispatch({ type: UPDATE_BOOKMARK,  payload: res.data });
        })
}
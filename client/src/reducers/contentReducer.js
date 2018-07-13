import { FETCH_CONTENT, CONTENT_ERROR } from '../actions/types';

const INITIAL_STATE = {
    bookname: '',
    content: '',
    prev: '',
    next: '',
    url: '',
    error: ''
};

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case FETCH_CONTENT:
            return { bookname: action.payload.bookname,
                     content: action.payload.content,
                     prev: action.payload.prev,
                     next: action.payload.next,
                     url: action.payload.myURL,
                     error: ''  };
        case CONTENT_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}
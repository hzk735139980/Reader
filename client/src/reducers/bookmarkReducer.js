import { FETCH_BOOKMARK, ADD_BOOKMARK, UPDATE_BOOKMARK, DELETE_BOOKMARK} from '../actions/types';

export default function(state = [], action){
    switch (action.type){
        case FETCH_BOOKMARK:
            return action.payload;
        case ADD_BOOKMARK:
            return action.payload;
        case UPDATE_BOOKMARK:
            return state;
        case DELETE_BOOKMARK:
            return state;
        default:
            return state;
    }
}
import { combineReducers } from 'redux';
import { ROOM_ACTIONS } from '../actions/roomActions';

const rooms = (state = [], action) => {
    switch (action.type) {
        case ROOM_ACTIONS.STORE:
        return action.payload;
        default:
        return state;
    }
}

export default rooms;
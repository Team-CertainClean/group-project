import { combineReducers } from 'redux';
import { ROOM_ACTIONS } from '../actions/roomActions';

const roomOptions = (state = [], action) => {
    switch (action.type) {
        case ROOM_ACTIONS.STORE_OPTIONS:
        return action.payload;
        default:
        return state;
    }
};


export default combineReducers({
    roomOptions,
});

import { combineReducers } from 'redux';
import { CLEANER_ACTIONS } from '../actions/cleanerActions';

const cleaners = (state = [], action) => {
    switch (action.type) {
        case CLEANER_ACTIONS.STORE:
        return action.payload;
        default:
        return state;
    }
}

export default cleaners;
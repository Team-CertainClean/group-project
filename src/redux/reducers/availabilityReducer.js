import { combineReducers } from 'redux';
import { AVAILABILITY_ACTIONS } from '../actions/availabilityActions';

const availability = (state = [], action) => {
    switch (action.type) {
        case AVAILABILITY_ACTIONS.STORE:
        return action.payload;
        default:
        return state;
    }
}

export default availability;
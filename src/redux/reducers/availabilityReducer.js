import { combineReducers } from 'redux';
import { AVAILABILITY_ACTIONS } from '../actions/availabilityActions';

const available = (state = [], action) => {
    switch (action.type) {
        case AVAILABILITY_ACTIONS.STORE:
        return action.payload;
        default:
        return state;
    }
}

const newAvailable = (state = [], action) => {
    switch (action.type) {
        case AVAILABILITY_ACTIONS.NEW:
        return [...state, action.payload];
        case AVAILABILITY_ACTIONS.RESET_NEW:
        return [];
        default:
        return state;
    }
}

const unavailable = (state = [], action) => {
    switch(action.type){
        case AVAILABILITY_ACTIONS.STORE_UN:
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    available,
    newAvailable,
    unavailable,
});
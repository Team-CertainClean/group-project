import { combineReducers } from 'redux';
import { CUSTOMER_ACTIONS } from '../actions/customerActions';

const customer = (state = {}, action) => {
    switch (action.type) {
        case CUSTOMER_ACTIONS.CONTACT:
            return {...state, contact: action.payload};
        case CUSTOMER_ACTIONS.ROOMS:
            return {...state, rooms: [...action.payload]};
        case CUSTOMER_ACTIONS.APPT:
            return {...state, appt: action.payload};
        case CUSTOMER_ACTIONS.LOCATION:
            return {...state, location: action.payload};
        case CUSTOMER_ACTIONS.DURATION:
            return {...state, duration: action.payload};
        case CUSTOMER_ACTIONS.RESET:
            return {};
        default:
            return state;
    }
}

export default customer;

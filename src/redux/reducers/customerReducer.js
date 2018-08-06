import { combineReducers } from 'redux';
import { CUSTOMER_ACTIONS } from '../actions/customerActions';

const customer = (state = {}, action) => {
    switch (action.type) {
        case CUSTOMER_ACTIONS.CONTACT:
            return {...state, requestContact: action.payload};
        case CUSTOMER_ACTIONS.ROOMS:
            return {...state, requestRooms: action.payload};
        case CUSTOMER_ACTIONS.APPT:
            return {...state, requestAppt: action.payload};
        default:
            return state;
    }
}

export default customer;

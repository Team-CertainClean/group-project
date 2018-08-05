import { combineReducers } from 'redux';
import { CUSTOMER_ACTIONS } from '../actions/customerActions';

const customerInfo = (state = {}, action) => {
    switch (action.type) {
        case CUSTOMER_ACTIONS.CONTACT:
            return action.payload;
        case CUSTOMER_ACTIONS.ROOMS:
            return action.payload;
        case CUSTOMER_ACTIONS.APPT:
            return action.payload;
        default:
            return state;
    }
}

export default customerInfo;

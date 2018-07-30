import { combineReducers } from 'redux';
import { CONTACT_ACTIONS } from '../actions/contactActions';

const contactInfo = (state = '', action) => {
    switch (action.type) {
        case CONTACT_ACTIONS.POST_CONTACT:
        return action.payload;
        default:
        return state;
    }
}

export default contactInfo;

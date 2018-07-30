import { combineReducers } from 'redux';
import { CONTACT_ACTIONS } from '../actions/contactActions';

const contactInfo = (state = '', action) => {
    switch (action.type) {
        case CONTACT_ACTIONS.POST_CONTACT:
        return state
}

export default combineReducers({
    contactInfo,
  });
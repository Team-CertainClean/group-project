import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import contactInfo from './contactReducer';
import locations from './locationReducer';

const store = combineReducers({
  user,
  login,
  contactInfo,
  locations
});

export default store;

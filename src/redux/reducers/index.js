import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import contactInfo from './contactReducer';
import locations from './locationReducer';
import rooms from './roomReducer';

const store = combineReducers({
  user,
  login,
  contactInfo,
  locations,
  rooms
});

export default store;

import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import customer from './customerReducer';
import locations from './locationReducer';
import rooms from './roomReducer';
import cleaners from './cleanerReducer';
import request from './requestReducer';
import availability from './availabilityReducer';
import cleaningTypes from './cleaningTypeReducer';

const store = combineReducers({
  user,
  login,
  customer,
  locations,
  rooms,
  cleaners,
  request,
  availability,
  cleaningTypes
});

export default store;

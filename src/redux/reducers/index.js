import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import customerInfo from './customerReducer';
import locations from './locationReducer';
import rooms from './roomReducer';
import cleaners from './cleanerReducer';
import request from './requestReducer';
import customer from './customerReducer';
import availability from './availabilityReducer';

const store = combineReducers({
  user,
  login,
  customerInfo,
  locations,
  rooms,
  cleaners,
  request,
  customer,
  availability,
});

export default store;

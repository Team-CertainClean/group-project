import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import customerInfo from './customerReducer';
import locations from './locationReducer';
import rooms from './roomReducer';
import cleaners from './cleanerReducer';

const store = combineReducers({
  user,
  login,
  customerInfo,
  locations,
  rooms,
  cleaners,
});

export default store;

import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import contactInfo from './contactReducer';

const store = combineReducers({
  user,
  login,
  contactInfo
});

export default store;

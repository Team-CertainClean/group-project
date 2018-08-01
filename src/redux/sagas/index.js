import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import locationSaga from './locationSaga';
import roomSaga from './roomSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    locationSaga(),
    roomSaga()
    // watchIncrementAsync()
  ]);
}

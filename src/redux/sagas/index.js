import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import locationSaga from './locationSaga';
import roomSaga from './roomSaga';
import cleanerSaga from './cleanerSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    locationSaga(),
    roomSaga(),
    cleanerSaga()
    // watchIncrementAsync()
  ]);
}

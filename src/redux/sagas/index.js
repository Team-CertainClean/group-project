import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import locationSaga from './locationSaga';
import roomSaga from './roomSaga';
import cleanerSaga from './cleanerSaga';
import requestSaga from './requestSaga';
import availabilitySaga from './availabilitySaga';
import customerSaga from './customerSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    locationSaga(),
    roomSaga(),
    cleanerSaga(),
    requestSaga(),
    availabilitySaga(),
    customerSaga()
    // watchIncrementAsync()
  ]);
}

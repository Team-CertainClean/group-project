import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import locationSaga from './locationSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    locationSaga()
    // watchIncrementAsync()
  ]);
}

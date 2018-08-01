import { put, takeLatest } from 'redux-saga/effects';
import { CLEANER_ACTIONS } from '../actions/cleanerActions';
import { fetchCleaners } from '../requests/cleanerRequests';

function* fetch(){
    try{
        const cleaners = yield fetchCleaners();
        yield put({type: CLEANER_ACTIONS.STORE, payload: cleaners});
    }catch(error){
        alert("Failed to fetch cleaners");
    }
}

function* cleanerSaga(){
    yield takeLatest(CLEANER_ACTIONS.FETCH, fetch);
}
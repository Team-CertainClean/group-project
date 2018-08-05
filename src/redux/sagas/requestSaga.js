import { put, takeLatest } from 'redux-saga/effects';
import { REQUEST_ACTIONS } from '../actions/requestActions';
import { fetchRequestData } from '../requests/requestRequests';

function* fetch(){
    try{
        const request = yield fetchRequestData();
        console.log(`in request saga`, request)
        yield put({type: REQUEST_ACTIONS.STORE, payload: request});
    }catch(error){
        alert("Failed to fetch request blob");
    }
}

function* requestSaga(){
    yield takeLatest(REQUEST_ACTIONS.FETCH, fetch);
}

export default requestSaga;
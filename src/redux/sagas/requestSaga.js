import { put, takeLatest } from 'redux-saga/effects';
import { REQUEST_ACTIONS } from '../actions/requestActions';
import { fetchRequestData, closeRequest, postRequest, updateRequest } from '../requests/requestRequests';

function* fetch(action){
    let sort = action.payload
    console.log(`fetch action.payload`, sort)
    try{
        const request = yield fetchRequestData(sort);
        yield console.log(`in request saga`, request)
        yield put({type: REQUEST_ACTIONS.STORE, payload: request});
    }catch(error){
        console.log("Failed to fetch big request blob on requestSaga", error);
    }
}

function* close(action){
    // console.log(`close function reqSaga`, action.payload)
    try{
        yield put({type: REQUEST_ACTIONS.POST, payload: action.payload})
        yield closeRequest(action.payload);
        yield put({type: REQUEST_ACTIONS.FETCH});
    }catch(error){
        yield alert('Error removing request', error);
    }
}

function* post(action){
    // console.log(`this is requestSaga`, action.payload)
    try{
        yield postRequest(action.payload);
    }catch(error){
        alert('Error posting to historical_contact_data', error);
    }
}

function* update(action){
    try{
        yield updateRequest(action.payload);
        // yield put({type: REQUEST_ACTIONS.FETCH});
    } catch(error){
        alert('Error updating this request', error);
    }
}

function* requestSaga(){
    yield takeLatest(REQUEST_ACTIONS.FETCH, fetch);
    yield takeLatest(REQUEST_ACTIONS.CLOSE, close);
    yield takeLatest(REQUEST_ACTIONS.POST, post);
    yield takeLatest(REQUEST_ACTIONS.UPDATE, update)
}

export default requestSaga;
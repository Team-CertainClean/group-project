import { put, takeLatest } from 'redux-saga/effects';
import { AVAILABILITY_ACTIONS } from '../actions/availabilityActions';
import { fetchAvailability, postAvailability, removeAvailability, editAvailability, fetchUnavailability } from '../requests/availabilityRequests';

console.log('SAGA');

function* fetch(){
    try{
        const availability = yield fetchAvailability();
        yield put({type: AVAILABILITY_ACTIONS.STORE, payload: availability});
    }catch(error){
        alert("Failed to fetch availability");
    }
}

function* getUn(action){
    try{
        const unavailability = yield fetchUnavailability();
        yield put({type: AVAILABILITY_ACTIONS.STORE_UN, payload: unavailability});
    }catch(error){
        alert("Failed to fetch unavailability");
    }
}

function* post(action){
    try{
        console.log('posting in availability saga');
        yield postAvailability(action.payload);
        yield put({type: AVAILABILITY_ACTIONS.FETCH});
    }catch(error){
        alert("Failed to post cleaner");
    }
}

function* remove(action){
    try{
        yield removeAvailability(action.payload);
        yield put({type: AVAILABILITY_ACTIONS.FETCH});
    }catch(error){
        alert("Failed to delete cleaner");
    }
}

function* edit(action){
    try{
        yield editAvailability(action.payload);
        yield put({type: AVAILABILITY_ACTIONS.FETCH});
    }catch(error){
        alert("Failed to edit cleaner")
    }
}

function* availabilitySaga(){
    yield takeLatest(AVAILABILITY_ACTIONS.FETCH, fetch);
    yield takeLatest(AVAILABILITY_ACTIONS.POST, post);
    yield takeLatest(AVAILABILITY_ACTIONS.REMOVE, remove);
    yield takeLatest(AVAILABILITY_ACTIONS.EDIT, edit);
    yield takeLatest(AVAILABILITY_ACTIONS.GET_UN, getUn);
}

export default availabilitySaga;
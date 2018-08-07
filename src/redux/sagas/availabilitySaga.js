import { put, takeLatest } from 'redux-saga/effects';
import { AVAILABILITY_ACTIONS } from '../actions/availabilityActions';
import { fetchAvailability, postAvailability, removeAvailability, editAvailability } from '../requests/availabilityRequests';

console.log('SAGA');

function* fetch(){
    try{
        const availability = yield fetchAvailability();
        yield put({type: AVAILABILITY_ACTIONS.STORE, payload: availability});
    }catch(error){
        alert("Failed to fetch cleaners");
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
    yield takeLatest(AVAILABILITY_ACTIONS.EDIT, edit)
}

export default availabilitySaga;
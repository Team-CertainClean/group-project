import { select, put, takeLatest } from 'redux-saga/effects';
import { AVAILABILITY_ACTIONS } from '../actions/availabilityActions';
import {getAvailability} from '../selectors/availabilitySelector';
import { fetchAvailability, postAvailability, removeAvailability, editAvailability, fetchUnavailability } from '../requests/availabilityRequests';

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

function* post(){
    try{
        const availabilityStore = yield select(getAvailability);
        console.log('posting in availability saga');
        yield postAvailability(availabilityStore);
        yield put({type: AVAILABILITY_ACTIONS.RESET_NEW});
        yield put({type: AVAILABILITY_ACTIONS.FETCH});
    }catch(error){
        alert("Failed to post availability");
    }
}

function* remove(action){
    try{
        yield removeAvailability(action.payload);
        yield put({type: AVAILABILITY_ACTIONS.FETCH});
    }catch(error){
        alert("Failed to delete availability");
    }
}

function* edit(action){
    try{
        yield editAvailability(action.payload);
        yield put({type: AVAILABILITY_ACTIONS.FETCH});
    }catch(error){
        alert("Failed to edit availability")
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
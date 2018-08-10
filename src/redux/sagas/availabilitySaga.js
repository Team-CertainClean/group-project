import { select, put, takeLatest } from 'redux-saga/effects';
import { AVAILABILITY_ACTIONS } from '../actions/availabilityActions';
import { fetchAvailability, postAvailability, removeAvailability, editAvailability } from '../requests/availabilityRequests';
import { getAvailability } from '../selectors/availabilitySelector';

console.log('SAGA');

function* fetch(){
    try{
        const availability = yield fetchAvailability();
        yield put({type: AVAILABILITY_ACTIONS.STORE, payload: availability});
    }catch(error){
        alert("Failed to fetch availability");
    }
}

function* post(){
    try{
        const availabilityStore = yield select(getAvailability);
        console.log('posting in availability saga');
        yield postAvailability(availabilityStore);
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
    yield takeLatest(AVAILABILITY_ACTIONS.EDIT, edit)
}

export default availabilitySaga;
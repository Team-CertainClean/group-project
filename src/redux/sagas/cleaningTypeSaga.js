import { CLEANING_TYPE_ACTIONS } from '../actions/cleaningTypeActions';
import { put, takeLatest } from 'redux-saga/effects';
import { fetchCleaningTypes, postCleaningType, removeCleaningType, updateCleaningType } from '../requests/cleaningTypeRequests';

function* fetch(){
    try{
        const cleaningTypes = yield fetchCleaningTypes();
        console.log(`cleaningTypes`, cleaningTypes)
        yield put({type: CLEANING_TYPE_ACTIONS.STORE, payload: cleaningTypes});
    }catch(error){
        alert('Error fetching cleaningType.')
    }
}

function* post(action){
    console.log(`POST cleaningTypeSaga`, action.payload)
    try{
        yield postCleaningType(action.payload);
        yield put({type: CLEANING_TYPE_ACTIONS.FETCH});
    }catch(error){
        alert("Failed to post location");
    }
}

function* remove(action){
    try{
        yield removeCleaningType(action.payload);
        yield put({type: CLEANING_TYPE_ACTIONS.FETCH});
    } catch(error){
        alert("Failed to post location")
    }
}

function* edit(action){
    try{
        yield updateCleaningType(action.payload);
        yield put({type: CLEANING_TYPE_ACTIONS.FETCH});
    }catch(error){
        alert("Failed to update location");
    }
}

function* cleaningTypeSaga(){
    yield takeLatest(CLEANING_TYPE_ACTIONS.FETCH, fetch);
    yield takeLatest(CLEANING_TYPE_ACTIONS.POST, post);
    yield takeLatest(CLEANING_TYPE_ACTIONS.REMOVE, remove);
    yield takeLatest(CLEANING_TYPE_ACTIONS.EDIT, edit);
}

export default cleaningTypeSaga;
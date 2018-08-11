import { CLEANING_TYPE_ACTIONS } from '../actions/cleaningTypeActions';
import { put, takeLatest } from 'redux-saga/effects';
import { fetchCleaningTypes } from '../requests/cleaningTypeRequests';

function* fetch(){
    try{
        const cleaningTypes = yield fetchCleaningTypes();
        console.log(`cleaningTypes`, cleaningTypes)
        yield put({type: CLEANING_TYPE_ACTIONS.STORE, payload: cleaningTypes});
    }catch(error){
        alert('Error fetching cleaningType.')
    }
}

function* cleaningTypeSaga(){
    yield takeLatest(CLEANING_TYPE_ACTIONS.FETCH, fetch);
    // yield takeLatest(CLEANING_TYPE_ACTIONS.POST, post);
    // yield takeLatest(CLEANING_TYPE_ACTIONS.REMOVE, remove);
    // yield takeLatest(CLEANING_TYPE_ACTIONS.EDIT, edit);
}

export default cleaningTypeSaga;
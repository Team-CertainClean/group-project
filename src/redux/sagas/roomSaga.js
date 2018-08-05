import { put, takeLatest } from 'redux-saga/effects';
import { ROOM_ACTIONS } from '../actions/roomActions';
import { fetchRooms, postRoom, removeRoom, editRoom } from '../requests/roomRequests';

function* fetch(){
    try{
        const roomOptions = yield fetchRooms();
        yield put({type: ROOM_ACTIONS.STORE_OPTIONS, payload: roomOptions});
    }catch(error){
        alert('Error fetching rooms.')
    }
}

function* post(action){
    try{
        yield postRoom(action.payload);
        yield put({type: ROOM_ACTIONS.FETCH});
    }catch(error){
        alert('Error posting room');
    }
}

function* remove(action){
    try{
        yield removeRoom(action.payload);
        yield put({type: ROOM_ACTIONS.FETCH});
    }catch(error){
        yield alert('Error removing room');
    }
}

function* edit(action){
    try{
        yield editRoom(action.payload);
        yield put({type: ROOM_ACTIONS.FETCH});
    }catch(error){
        yield alert("Error editing room");
    }
}

function* roomSaga(){
    yield takeLatest(ROOM_ACTIONS.FETCH, fetch);
    yield takeLatest(ROOM_ACTIONS.POST, post);
    yield takeLatest(ROOM_ACTIONS.REMOVE, remove);
    yield takeLatest(ROOM_ACTIONS.EDIT, edit);
}

export default roomSaga;
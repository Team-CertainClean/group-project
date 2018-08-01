import { put, takeLatest } from 'redux-saga/effects';
import { ROOM_ACTIONS } from '../actions/roomActions';
import { fetchRooms, postRoom } from '../requests/roomRequests';

function* fetch(){
    try{
        const rooms = yield fetchRooms();
        yield put({type: ROOM_ACTIONS.STORE, payload: rooms});
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

function* roomSaga(){
    yield takeLatest(ROOM_ACTIONS.FETCH, fetch);
    yield takeLatest(ROOM_ACTIONS.POST, post);
}

export default roomSaga;
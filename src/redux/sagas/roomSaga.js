import { put, takeLatest } from 'redux-saga/effects';
import { ROOM_ACTIONS } from '../actions/roomActions';
import { fetchRooms } from '../requests/roomRequests';

function* fetch(){
    try{
        const rooms = yield fetchRooms();
        yield put({type: ROOM_ACTIONS.STORE, payload: rooms});
    }catch(error){
        alert('Error fetching rooms.')
    }
}

function* roomSaga(){
    yield takeLatest(ROOM_ACTIONS.FETCH, fetch);
}

export default roomSaga;
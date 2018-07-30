import { put, takeLatest } from 'redux-saga/effects';
import { CONTACT_ACTIONS } from '../actions/contactActions';

function* postContact(action){
    try{
        yield callContact(action.payload);
    }
}

function* contactSaga() {
    yield takeLatest(CONTACT_ACTIONS.POST_CONTACT, postContact);
  }
  
export default contactSaga;
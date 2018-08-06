import { select, takeLatest } from 'redux-saga/effects';
import { CUSTOMER_ACTIONS } from '../actions/customerActions';
import { getRequest } from '../selectors/customerSelector';

function* handleCustomerRequest(){
    try{
        const customerRequest = yield select(getRequest);
        yield 
    }catch(error){
        console.log('Error posting customer request: ', error);
        alert('Failed to submit request, please contact us directly by phone or email.');
    }   
}
  
function* customerSaga(){
    yield takeLatest(CUSTOMER_ACTIONS.POST, handleCustomerRequest);
}

export default customerSaga;
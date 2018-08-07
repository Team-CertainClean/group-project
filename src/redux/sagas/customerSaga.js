import { select, put, takeLatest } from 'redux-saga/effects';
import { CUSTOMER_ACTIONS } from '../actions/customerActions';
import { getRequest } from '../selectors/customerSelector';
import { postRequest } from '../requests/customerRequests';

function* handleCustomerRequest(){
    try{
        const customerRequest = yield select(getRequest);
        yield postRequest(customerRequest);
        yield put({type: CUSTOMER_ACTIONS.RESET});
    }catch(error){
        yield console.log('Error posting customer request: ', error);
        yield alert('Failed to submit request, please contact us directly by phone or email.');
    }
}
  
function* customerSaga(){
    yield takeLatest(CUSTOMER_ACTIONS.POST, handleCustomerRequest);
}

export default customerSaga;
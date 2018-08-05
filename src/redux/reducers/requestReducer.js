import { REQUEST_ACTIONS } from '../actions/requestActions';

const request = (state = [], action) => {
    switch (action.type) {
        case REQUEST_ACTIONS.STORE:
        console.log(`in request reducer`, action.payload)
        return action.payload;
        default:
        return state;
    }
}

export default request;
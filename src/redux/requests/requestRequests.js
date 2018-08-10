import axios from 'axios';

export function fetchRequestData(payload){
    console.log(`this is fetchRequestData on requestRequests`, );
    let url;
    if(payload){
        url = `/api/request/requestTable?sort=${payload.orderParam}&order=${payload.sortBy}`;
    } else {
        url = '/api/request/requestTable';
    }
    console.log(`url`, url)
    return axios.get(url)
        .then(response => {
            console.log(`response`, response)
            return response.data})
        .catch(error=>{
            alert("Error fetching requests");
            console.log(`reqREQ`, error);
        });
}


export function closeRequest(payload){
    // console.log(`this is requestRouter payload`, payload.request_info.request_id)
    return axios.delete(`/api/request/${payload.request_info.request_id}`)
        .then(response => response)
        .catch(error =>{
            alert("Failed to remove request");
            throw error.response || error;
        });
}

export function postRequest(payload){
    return axios.post('/api/request/historical', payload)
        .then(response => response)
        .catch(error=>{
            alert("Failed to post to historical_contact_data");
            throw error.response || error;
        });
}

export function updateRequest(payload){
    console.log(`in updateReqest`, payload)
    return axios.put(`/api/request/${payload.payload.request_id}`, payload   )
        .then(response => response)
        .catch(error =>{
            alert("Failed to edit request");
            throw error.response || error;
        });
}
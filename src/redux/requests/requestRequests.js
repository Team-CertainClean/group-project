import axios from 'axios';

export function fetchRequestData(){
    return axios.get('/api/request/requestTable')
        .then(response => response.data)
        .catch(error=>{
            alert("Error fetching requests");
            throw error.response || error;
        });
}

export function closeRequest(payload){
    console.log(`this is requestRouter payload`, payload.request_info.request_id)
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
    return axios.put(`/api/room/${payload.id}`, payload)
        .then(response => response)
        .catch(error =>{
            alert("Failed to edit request");
            throw error.response || error;
        });
}
import axios from 'axios';

export function fetchRequestData(){
    return axios.get('/api/request/requestTable')
        .then(response => response.data)
        .catch(error=>{
            alert("Error fetching requests");
            throw error.response || error;
        });
}
import axios from 'axios';

export function fetchLocations(){
    return axios.get('/api/room/location')
        .then(response => response.data)
        .catch(error=> alert("Failed to fetch locations"))
}

export function postLocation(payload){
    return axios.post('/api/room/location')
        .then(response => alert("Post successful"))
        .catch(error=> alert("Failed to post location"));
}
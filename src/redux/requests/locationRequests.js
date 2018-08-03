import axios from 'axios';

export function fetchLocations(){
    return axios.get('/api/room/location')
        .then(response => response.data)
        .catch(error=> alert("Failed to fetch locations"))
}

export function postLocation(payload){
    return axios.post('/api/room/location', payload)
        .then(response => alert("Post successful"))
        .catch(error=> alert("Failed to post location"));
}

export function removeLocation(payload){
    return axios.delete(`/api/room/location/${payload}`)
        .then(response => response)
        .catch(error=> alert("Failed to remove location"));
}

export function updateLocation(payload){
    return axios.put(`/api/room/location/${payload.id}`, payload)
        .then(response => response)
        .catch(error => alert("Failed to update location"));
}
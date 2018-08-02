import axios from 'axios';

export function fetchRooms(){
    return axios.get('/api/room')
        .then(response => response.data)
        .catch(error=> alert("Error fetching rooms"));
}

export function postRoom(payload){
    return axios.post('/api/room', payload)
        .then(response => response)
        .catch(error=>alert("Failed to post room."));
}

export function removeRoom(payload){
    return axios.delete(`/api/room/${payload}`)
        .then(response => response)
        .catch(error => alert("Failed to remove room"));
}

export function editRoom(payload){
    return axios.put(`/api/room/${payload.id}`, payload)
        .then(response => response)
        .catch(error => alert("Failed to edit room"));
}
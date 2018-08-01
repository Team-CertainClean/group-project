import axios from 'axios';

export function fetchRooms(){
    return axios.get('/api/room')
        .then(response => response.data)
        .catch(error=> alert("Error fetching rooms"));
}

export function postRoom(payload){
    return axios.post('/api/room')
        .then(response => response)
        .catch(error=>alert("Failed to post room."));
}
import axios from 'axios';

export function fetchRooms(){
    return axios.get('/api/room')
        .then(response => response.data)
        .catch(error=> alert("Error fetching rooms"));
}
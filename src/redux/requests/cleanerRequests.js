import axios from 'axios';

export function fetchCleaners(){
    return axios.get('/api/cleaner')
        .then(response => response.data)
        .catch(error=>alert("Error fetching cleaners"));
}
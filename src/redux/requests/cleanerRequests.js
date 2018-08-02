import axios from 'axios';

export function fetchCleaners(){
    return axios.get('/api/cleaner')
        .then(response => response.data)
        .catch(error=>alert("Error fetching cleaners"));
}

export function postCleaner(payload){
    console.log(payload);
    return axios.post('/api/cleaner', payload)
        .then(response => response)
        .catch(error=>alert('Error posting cleaner'));
}
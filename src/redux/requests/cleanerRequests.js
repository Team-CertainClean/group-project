import axios from 'axios';

export function fetchCleaners(){
    return axios.get('/api/cleaner')
        .then(response => response.data)
        .catch(error=>{
            alert("Error fetching cleaners");
            throw error.reponse || error;
        });
}

export function postCleaner(payload){
    return axios.post('/api/cleaner', payload)
        .then(response => response)
        .catch(error=>{
            alert('Error posting cleaner');
            throw error.response || error;
        });
}

export function removeCleaner(payload){
    return axios.delete(`/api/cleaner/${payload}`)
        .then(response => response)
        .catch(error =>{
            alert('Error removing cleaner.');
            throw error.response || error;
        });
}

export function editCleaner(payload){
    return axios.put(`/api/cleaner/${payload.id}`, payload)
        .then(response => response)
        .catch(error =>{
            alert("Erorr editing cleaner");
            throw error.response || error;
        });
}
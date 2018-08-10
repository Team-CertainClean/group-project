import axios from 'axios';

export function fetchAvailability(){
    return axios.get('/api/availability')
        .then(response => response.data)
        .catch(error=>{
            alert("Error fetching availability");
            throw error.reponse || error;
        });
}

export function postAvailability(availabilityStore){
    return axios.post('/api/availability', availabilityStore)
        .then(response => response)
        .catch(error=>{
            alert('Error posting availability');
            throw error.response || error;
        });
}

export function removeAvailability(payload){
    return axios.delete(`/api/availability/${payload}`)
        .then(response => response)
        .catch(error =>{
            alert('Error removing availability.');
            throw error.response || error;
        });
}

export function editAvailability(payload){
    return axios.put(`/api/availability/${payload.id}`, payload)
        .then(response => response)
        .catch(error =>{
            alert("Erorr editing availability");
            throw error.response || error;
        });
}
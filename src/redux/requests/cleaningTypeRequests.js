import axios from 'axios';

export function fetchCleaningTypes(){
    console.log(`in fetchCleaningType`)
    return axios.get('/api/cleaningtype')
        .then(response => response.data)
        .catch(error=>{
            alert("Error fetching cleaningTypes");
            throw error.reponse || error;
        });
}

export function postCleaningType(payload){
    return axios.post('/api/cleaningtype', payload)
        .then(response => response)
        .catch(error=>{
            console.log("Failed to post cleaningType", error);
        });
}

export function removeCleaningType(payload){
    return axios.delete(`/api/cleaningtype/${payload}`, payload)
    .then(response => console.log("Delete Successful on cleaningTypeReqs"))
    .catch(error=>{
        console.log("Failed to delete cleaningType on cleaningTypeReqs", error)
    })
}

export function updateCleaningType(payload){
    return axios.put(`/api/cleaningtype/${payload.id}`, payload)
        .then(response => response)
        .catch(error =>{
            console.log("Failed to update location", error);
        });
}
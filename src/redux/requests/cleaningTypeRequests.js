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
        .then(response => alert("Post successful"))
        .catch(error=>{
            console.log("Failed to post cleaningType", error);
        });
}

export function removeCleaningType(payload){
    return axios.delete('/api/cleaningtype', payload)
    .then(response => console.log("Delete Successful on cleaningTypeReqs"))
    .catch(error=>{
        console.log("Failed to delete cleaningType on cleaningTypeReqs", error)
    })
}
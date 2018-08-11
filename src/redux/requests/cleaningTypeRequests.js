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
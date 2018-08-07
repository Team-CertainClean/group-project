import axios from 'axios';

export function* postRequest(payload){
    return axios.post('/api/request', payload)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    });
}
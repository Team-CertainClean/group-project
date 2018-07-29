import axios from 'axios';

export function callLogin(payload) {
  const body = ({
    username: payload.username,
    password: payload.password,
  });

  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('api/admin/login', body, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callLogout() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('api/admin/logout', config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

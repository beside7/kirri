import axios from 'axios';

const SERVER_URL = 'http://localhost:8080/';

const apiClient = axios.create({
  baseURL: SERVER_URL,
  headers:{
      "Authorization": ''
  }
});

export { apiClient };

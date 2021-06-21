import axios from 'axios';

const SERVER_URL = 'http://118.36.207.82:8080';

const apiClient = axios.create({
  baseURL: SERVER_URL,
  headers:{
      "Authorization": ''
  }
});

export { apiClient, SERVER_URL };

import axios from 'axios';

const SERVER_URL = 'http://118.36.207.124:8080';

const apiClient = axios.create({
  baseURL: SERVER_URL,
  headers:{
      "Authorization": ''
  }
});

apiClient.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 일

    return config;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    return Promise.reject(error);
  });



export { apiClient, SERVER_URL };

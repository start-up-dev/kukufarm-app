import axios from 'axios';
import {BASE_URL} from 'config/http';

import {store} from 'store';

axios.defaults.baseURL = BASE_URL;

const useAxios = axios.create();

useAxios.interceptors.request.use(
  async config => {
    const token = store.getState().auth.token;
    console.log(token);

    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

useAxios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    error.response &&
      console.log({
        api: error.config.baseURL + error.config.url,
        data: error.config.data,
        response: error?.response.data,
      });
    // if (error?.response?.status === 401) {
    //   userLogout(true);
    // }

    return Promise.reject(error.response.data.issue);
  },
);

export default useAxios;

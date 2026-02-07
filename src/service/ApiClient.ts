import { BASE_URL } from '@/library';
import axios from 'axios';
import type { AxiosInstance } from 'axios';


class APIClient {
   axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();
    this.axiosInstance.interceptors.request.use(config => {
    //   const jwt = localStorage.getItem('x');

    //   if (config.headers) {
    //     config.headers.Authorization = `Bearer ${jwt}`;
    //   }
      config.baseURL = BASE_URL;
      return config;
    });
  }
}

export default new APIClient().axiosInstance;
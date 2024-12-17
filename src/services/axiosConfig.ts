import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_HOST } from '../constants/common.constants.ts';

// Base Axios instance
const axiosInstance = axios.create({
  baseURL: BACKEND_HOST || 'http://localhost:5000',
  timeout: 10000,
});

// Add JWT interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;

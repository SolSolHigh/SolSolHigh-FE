import axios from 'axios';
import { showToast } from '../utils/toastUtil';

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? ''
      : 'https://www.solsol-high.kro.kr',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

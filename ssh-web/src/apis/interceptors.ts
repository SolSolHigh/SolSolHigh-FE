import axios from 'axios';
import { showToast } from '../utils/toastUtil';

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
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
    showToast('error', '오류가 발생하였습니다.');
    if (error.response?.status === 401) {
      // 비로그인 상태 확인 시 처리로직 추가작업 필요함
    }
    return Promise.reject(error);
  },
);

import { api } from './interceptors';

export const checkSession = async () => {
  return await api.options('/api/users/info');
};

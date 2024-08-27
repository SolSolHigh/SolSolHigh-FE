import { ISignupRequest } from '../interfaces/userInterface';
import { api } from './interceptors';

export const checkSession = async () => {
  return await api.options('/api/users/info');
};

export const signup = (signupRequest: ISignupRequest) => {
  return api.post('/api/users', { data: signupRequest });
};

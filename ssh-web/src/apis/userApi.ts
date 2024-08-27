import {
  IChild,
  IParent,
  ISignupRequest,
  IUserInfo,
} from '../interfaces/userInterface';
import { api } from './interceptors';

export const checkSession = async () => {
  return await api.options('/api/users/info');
};

export const nicknameDuplicate = (nickname: string) => {
  return api.get(`/api/users?nickname=${nickname}`);
};

export const signup = (signupRequest: ISignupRequest) => {
  return api.post('/api/users', signupRequest);
};

export const getUserInfo = () => {
  return api.get<IUserInfo>('/api/users/info');
};

export const getMyChildren = () => {
  return api.get<IChild[]>('/api/parents/children');
};

export const getMyParents = () => {
  return api.get<IParent>('/api/children/parents');
};

export const getMyWaitingChildren = () => {
  return api.get<IChild[]>('/api/parents/children/waiting');
};

export const deleteMyChild = (nickname: string) => {
  return api.patch('/api/parents/children', { nickname: nickname });
};

export const deleteMyWaitingChild = (nickname: string) => {
  return api.patch('/api/parents/children/waiting', { nickname: nickname });
};

export const findChildByNickname = (nickname: string) => {
  return api.post('/api/children', { nickname: nickname });
};

export const requestChild = (nickname: string) => {
  return api.post('/api/parents/children/request', { nickname: nickname });
};

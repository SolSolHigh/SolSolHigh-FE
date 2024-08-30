import {
  IChildExperience,
  IChildExpRecord,
} from '../interfaces/experienceInterface';
import { api } from './interceptors';

export const getExperience = () => {
  return api.get<IChildExperience>('/api/children/experience');
};

export const getChildExpRecords = (nickname: string) => {
  return api.get<IChildExpRecord[]>(`/api/children/${nickname}/experience/log`);
};

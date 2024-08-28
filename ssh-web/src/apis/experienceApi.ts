import { IChildExperience } from '../interfaces/experienceInterface';
import { api } from './interceptors';

export const getExperience = () => {
  return api.get<IChildExperience>('/api/children/experience');
};

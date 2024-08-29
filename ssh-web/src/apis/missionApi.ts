import { AxiosResponse } from 'axios';
import {
  IMissionCreateRequest,
  IMissionUpdateRequest,
  IPaginatedMissions,
} from '../interfaces/missionInterface';
import { api } from './interceptors';

export const createMission = (
  newMission: IMissionCreateRequest,
): Promise<AxiosResponse<IMissionCreateRequest>> => {
  return api.post('/api/children/missions', newMission);
};

export const updateMission = (
  missionId: number,
  updatedData: IMissionUpdateRequest,
): Promise<AxiosResponse<void>> => {
  return api.patch(`/api/children/missions/${missionId}`, updatedData);
};

export const deleteMission = (
  missionId: number,
): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/children/missions/${missionId}`);
};

export const getMissionsForParent = (
  page: number,
  size: number,
  isFinished: boolean,
): Promise<AxiosResponse<IPaginatedMissions>> => {
  return api.get('/api/children/missions/query', {
    params: {
      page,
      size,
      'is-finished': isFinished,
    },
  });
};

export const getMissionsForChild = (
  page: number,
  size: number,
  isFinished: boolean,
): Promise<AxiosResponse<IPaginatedMissions>> => {
  return api.get('/api/children/missions/query', {
    params: {
      page,
      size,
      'is-finished': isFinished,
    },
  });
};

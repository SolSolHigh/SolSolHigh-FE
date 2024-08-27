import { AxiosResponse } from 'axios';
import {
  IMissionCreateRequest,
  IMissionUpdateRequest,
} from '../interfaces/missionInterfaces';
import { api } from './interceptors';

// 미션 생성
export const createMission = async (
  newMission: IMissionCreateRequest,
): Promise<AxiosResponse<IMissionCreateRequest>> => {
  return await api.post('/api/children/missions', newMission);
};

// 미션 수정
export const updateMissionStatus = async (
  missionId: number,
  updatedData: Partial<IMissionUpdateRequest>,
): Promise<AxiosResponse> => {
  return await api.patch(`/api/missions/${missionId}`, updatedData);
};

// 미션 삭제
export const deleteMission = async (
  missionId: number,
): Promise<AxiosResponse> => {
  return await api.delete(`/api/missions/${missionId}`);
};

export interface IChildInfo {
  childId: number;
  name: string;
}

export interface IMission {
  childInfo: IChildInfo;
  missionId: number;
  description: string;
  isFinished: boolean;
  missionStartAt: string;
  missionEndAt: string;
  missionFinishedAt: string | null;
  missionLevel: '1' | '2' | '3'; // 하, 중, 상
}

// 미션 등록 요청 타입
export interface IMissionCreateRequest {
  childId: number;
  description: string;
  missionStartAt: string;
  missionEndAt: string;
  missionLevel: '1' | '2' | '3';
}

// 미션 수정 요청 타입
export type IMissionUpdateRequest = Partial<
  Omit<IMission, 'missionId' | 'childInfo'>
>;

// 미션 삭제는 요청 바디 없이 missionId만 필요함.

// 미션 조회 응답 타입 (부모용)
export type IParentMissionResponse = IMission;

// 미션 조회 응답 타입 (자식용)
export type IChildMissionResponse = Omit<IMission, 'childInfo'>;

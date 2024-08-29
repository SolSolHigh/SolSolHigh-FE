export interface IChildInfo {
  childId: number;
  name: string;
  nickname: string;
}

export interface IMission {
  missionId: number;
  description: string;
  isFinished: boolean;
  missionStartAt: string;
  missionEndAt: string;
  missionLevel: '1' | '2' | '3';
  childInfo?: IChildInfo;
  missionFinishedAt?: string | null;
}

export interface IMissionCreateRequest {
  nickname: string; // 아이의 닉네임
  description: string; // 미션 설명
  missionStartAt: string; // 미션 시작 시간 (예: "2024-05-24 02:00:00")
  missionEndAt: string; // 미션 종료 시간 (예: "2024-05-24 02:00:00")
  missionLevel: '1' | '2' | '3'; // 미션 난이도 ("1": 하, "2": 중, "3": 상)
}

export type IMissionUpdateRequest = Partial<
  Omit<IMission, 'missionId' | 'childInfo'>
>;

export interface IPaginatedMissions {
  content: IMission[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

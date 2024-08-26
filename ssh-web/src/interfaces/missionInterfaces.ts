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

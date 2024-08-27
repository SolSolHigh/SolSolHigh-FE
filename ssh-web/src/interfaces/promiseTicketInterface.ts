export interface IPromiseLogs {
  id: number;
  imageUrl: string;
  publishAt: string;
  requestedAt?: string;
  usedAt?: string;
  description: string;
}

export type IPromiseLogsList = IPromiseLogs[];

export const ArrayActiveTitle = ['계란 깨기', '계란 지갑'];

export enum EActiveTitle {
  break = '계란깨기',
  wallet = '계란지갑',
}

export interface IActiveTab {
  index: number;
  title: string;
}

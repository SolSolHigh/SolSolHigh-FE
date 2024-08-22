export type TColor =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'dark'
  | 'light';

export enum EResize {
  M = 'M',
  T = 'T',
  D = 'D',
}

export type TBreakPoint = { [key: string]: number };

export const BreakPoints: TBreakPoint = {
  MOB: 767,
  TABLET: 1279,
  DESKTOP: 1280,
};

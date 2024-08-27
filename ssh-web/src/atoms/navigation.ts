import { atom } from 'recoil';

export enum ENavigationBgColors {
  light = 'bg-white',
  primary = 'bg-primary-100',
}

export const navigationBgColorState = atom({
  key: 'navigationBgColorState',
  default: 'bg-white',
});

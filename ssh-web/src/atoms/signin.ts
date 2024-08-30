import { atom } from 'recoil';

export const signinAtom = atom<boolean>({
  key: 'signinAtom',
  default: false,
});

import { atom, selector } from 'recoil';

export const signupAtom = atom({
  key: 'signupAtom',
  default: 0,
});

export const signupSelector = selector({
  key: 'signupSelector',
  get: ({ get }) => get(signupAtom),
  set: ({ set }, newStep) => set(signupAtom, newStep),
});

import { atom, selector } from 'recoil';
import { TPlatform } from '../themes/themeBase';

export const platformState = atom<TPlatform>({
  key: 'platformState',
  default: 'T',
});

export const platformSelector = selector<TPlatform>({
  key: 'platformSelector',
  get: ({ get }) => get(platformState),
  set: ({ set }, newPlatform) => set(platformState, newPlatform),
});

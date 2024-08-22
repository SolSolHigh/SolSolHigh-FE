import { atom } from 'recoil';
import { EResize } from '../themes/themeBase';

export const resizeState = atom<EResize>({
  key: 'resize',
  default: EResize.M,
});

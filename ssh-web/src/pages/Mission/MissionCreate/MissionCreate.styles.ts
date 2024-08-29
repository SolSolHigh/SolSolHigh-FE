import { tv } from 'tailwind-variants';

export const missionCreateStyles = tv({
  base: 'flex flex-col w-full items-center justify-center bg-white gap-4',
  variants: {
    size: {
      M: 'px-4 py-1',
      T: 'px-6 py-6',
      D: 'px-8 py-8',
    },
  },
});

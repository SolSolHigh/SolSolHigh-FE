import { tv } from 'tailwind-variants';

export const containerStyles = tv({
  base: 'flex flex-col w-full px-8 py-4 bg-white gap-y-4',
});

export const titleStyles = tv({
  base: 'flex items-center justify-between w-full',
});

export const infoStyles = tv({
  base: 'flex w-full',
});

export const mascotStyles = tv({
  base: 'flex items-center justify-center w-full gap-x-8',
});

export const isEmptyStyles = tv({
  base: 'flex flex-col justify-center items-center gap-y-2',
  variants: {
    isEmpty: {
      true: 'w-full h-full py-2',
    },
  },
});

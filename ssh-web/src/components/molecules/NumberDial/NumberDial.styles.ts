import { tv } from 'tailwind-variants';

export const containerStyles = tv({
  base: 'relative flex flex-col items-center w-full h-full select-none',
});

export const numberBoxStyles = tv({
  base: 'absolute w-full flex items-center justify-center cursor-pointer ',
  variants: {
    position: {
      '-2': '-top-20',
      '-1': '-top-10',
      '1': 'top-10',
      '2': 'top-20',
    },
  },
});

export const numberStyles = tv({
  base: 'transition-transform -translate-y-1/2 duration-300 ease-in-out',
  variants: {
    selected: {
      true: 'scale-125 opacity-100',
      false: 'scale-100 opacity-50',
    },
  },
});

export const specifiedStyles = tv({
  base: 'absolute -translate-y-1/2 -translate-x-full flex justify-center gap-x-2',
  variants: {
    need: {
      false: 'hidden',
    },
  },
});

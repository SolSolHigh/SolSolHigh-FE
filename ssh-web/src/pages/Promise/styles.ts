import { tv } from 'tailwind-variants';

export const layoutStyles = tv({
  base: 'flex items-center justify-center w-full h-auto',
  variants: {
    size: {
      M: '',
      T: 'flex-col',
      D: '',
    },
  },
});

export const containerStyles = tv({
  base: 'bg-white flex flex-col items-center w-full ',
  variants: {
    size: {
      M: 'h-full p-4 ',
      T: 'h-full p-6 ',
      D: 'rounded-2xl px-4 max-w-[48rem] h-[48rem]',
    },
  },
});

export const contentStyles = tv({
  base: 'flex justify-between items-center w-full mb-4',
  variants: {
    size: {
      M: '',
      T: '',
      D: '',
    },
  },
});

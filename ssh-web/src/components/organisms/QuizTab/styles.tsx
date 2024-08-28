import { tv } from 'tailwind-variants';

export const Card = tv({
  base: 'flex items-center justify-center w-full h-auto',
  variants: {
    size: {
      M: '',
      T: 'flex-col',
      D: 'p-8 h-[48rem]',
    },
  },
});

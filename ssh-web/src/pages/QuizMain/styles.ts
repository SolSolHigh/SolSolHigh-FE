import { tv } from 'tailwind-variants';

export const containerStyles = tv({
  base: 'flex items-center justify-center w-full h-auto ',
  variants: {
    size: {
      M: '',
      T: 'flex-col',
      D: '',
    },
  },
});

export const Main = {
  container: tv({
    base: 'bg-white flex flex-col items-center w-full ',
    variants: {
      size: {
        M: 'h-full p-4 ',
        T: 'h-full p-6 ',
        D: 'rounded-2xl px-4 max-w-[48rem] h-[48rem]',
      },
    },
  }),
  content: tv({
    base: 'flex flex-row w-full justify-between',
    variants: {
      size: {
        M: '',
        T: 'mt-12 p-4 w-[48rem]',
        D: 'p-8 w-[48rem]',
      },
    },
  }),
};

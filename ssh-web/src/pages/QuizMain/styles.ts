import { tv } from 'tailwind-variants';

export const containerStyles = tv({
  base: 'flex items-center justify-center w-full h-auto tablet:flex-col',
});

export const Main = {
  container: tv({
    base: 'w-full h-full bg-white max-w-[768px]',
    variants: {
      size: {
        M: 'p-4',
        T: 'p-6 mt-16',
        D: 'p-8 mt-16 h-[48rem]',
      },
    },
  }),
  content: tv({
    base: 'flex flex-row justify-between',
    variants: {
      size: {
        M: '',
        T: 'p-4',
        D: 'p-8',
      },
    },
  }),
};

import { tv } from 'tailwind-variants';

export const Main = {
  container: tv({
    base: 'w-full bg-primary-200 max-w-[768px]',
    variants: {
      size: {
        M: 'p-4',
        T: 'p-6 mt-16',
        D: 'p-8 mt-16',
      },
    },
  }),
};

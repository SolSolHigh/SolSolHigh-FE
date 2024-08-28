import { tv } from 'tailwind-variants';

export const layoutStyles = tv({
  base: 'flex items-center justify-center w-full h-auto ',
  variants: {
    size: {
      M: '',
      T: 'flex-col',
      D: '',
    },
  },
});

export const containerStyles = tv({
  base: 'bg-white flex flex-col items-center w-full overflow-auto',
  variants: {
    size: {
      M: 'h-full p-4 ',
      T: 'h-full p-6 ',
      D: 'rounded-2xl px-4 max-w-[48rem] h-[48rem]',
    },
  },
});

export const contentStyles = tv({
  base: 'flex justify-around items-center w-full my-4 p-4 bg-primary-400 rounded-lg max-w-[90%]',
  variants: {
    size: {
      M: '',
      T: '',
      D: '',
    },
  },
});

export const gridStyles = tv({
  base: 'grid ',
  variants: {
    size: {
      M: 'grid-cols-2 gap-8',
      T: 'grid-cols-4 gap-12',
      D: 'grid-cols-4 gap-12',
    },
  },
});

import { tv } from 'tailwind-variants';

export const mascotStyles = tv({
  base: 'flex justify-center desktop:flex-col desktop:items-center desktop:gap-y-12 tablet:items-end tablet:gap-x-2 tablet:mt-8 tablet:mb-4',
});

export const mascotImgStyles = tv({
  variants: {
    platform: {
      W: '',
      T: 'w-28 h-28',
      M: 'w-28 h-28',
    },
  },
});

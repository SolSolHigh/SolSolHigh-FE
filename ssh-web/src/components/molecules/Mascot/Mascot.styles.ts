import { tv } from 'tailwind-variants';

export const mascotStyles = tv({
  base: 'flex justify-center desktop:flex-col desktop:items-center desktop:gap-y-12 tablet:items-end tablet:gap-x-2 tablet:mt-8 tablet:mb-4',
});

export const mascotImgStyles = tv({
  base: 'tablet:w-28 tablet:h-28',
});

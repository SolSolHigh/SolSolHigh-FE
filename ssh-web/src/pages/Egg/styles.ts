import { tv } from 'tailwind-variants';

export const contentStyles = tv({
  base: 'bg-primary-100 flex flex-col items-center w-full h-full px-32 desktop:min-h-full mob:!px-4 desktop:rounded-2xl desktop:py-12',
});

export const containerStyles = tv({
  base: 'flex items-center justify-center w-full h-auto tablet:flex-col desktop:py-12 px-14 tablet:px-0 mob:px-0',
});

export const titleBoxStyles = tv({
  base: 'bg-primary-100 w-full text-left sticky top-14 z-10 rounded-xl flex flex-col gap-2',
});

export const missionListBoxStyles = tv({
  base: 'mt-8 flex-1 w-full h-max overflow-auto',
});

export const mascotWrapperStyles = tv({
  base: 'flex items-center justify-center w-full',
});

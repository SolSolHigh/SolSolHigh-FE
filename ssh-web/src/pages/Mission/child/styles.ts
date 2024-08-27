import { tv } from 'tailwind-variants';

export const contentStyles = tv({
  base: 'bg-white flex flex-col items-center w-full h-full px-32 desktop:min-h-full mob:!px-4 desktop:rounded-2xl desktop:py-12',
});

export const containerStyles = tv({
  base: 'flex items-center justify-center w-full h-auto tablet:flex-col desktop:py-12 px-14 tablet:px-0 mob:px-0',
});

export const titleBoxStyles = tv({
  base: 'w-full text-left sticky top-14 bg-white z-10 rounded-xl flex flex-col gap-2',
});

export const missionListBoxStyles = tv({
  base: 'mt-8 flex-1 w-full h-max overflow-auto',
});

export const mascotWrapperStyles = tv({
  base: 'flex items-center justify-center w-full',
});

export const bigButtonStyles = tv({
  base: '!bg-primary-400 hover:!bg-primary-300 active:!bg-primary-300 !rounded-3xl !w-full !px-4 !z-10 !py-8 font-bold !text-2xl my-4',
});

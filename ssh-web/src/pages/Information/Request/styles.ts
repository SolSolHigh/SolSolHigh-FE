import { tv } from 'tailwind-variants';

export const containerStyles = tv({
  base: 'flex items-center justify-center w-full h-auto tablet:flex-col',
});

export const contentStyles = tv({
  base: 'flex flex-col items-center justify-between gap-y-4 bg-white desktop:w-[48rem] desktop:h-[48rem] desktop:rounded-lg desktop:py-12 tablet:w-full tablet:h-full tablet:py-8',
});

export const infoBoxStyles = tv({
  base: 'relative w-full desktop:px-36 tabletB:px-20 mob:px-8',
});

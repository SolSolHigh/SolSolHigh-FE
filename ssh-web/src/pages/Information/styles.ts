import { tv } from 'tailwind-variants';

export const containerStyles = tv({
  base: 'flex items-center justify-center w-full h-auto tablet:flex-col',
});

export const contentStyles = tv({
  base: 'flex flex-col items-center gap-y-4 desktop:w-[48rem] desktop:h-[48rem] desktop:rounded-lg desktop:py-20 tablet:w-full tablet:h-full tablet:rounded-t-[2rem] tablet:py-8 bg-secondary-100',
});

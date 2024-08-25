import { tv } from 'tailwind-variants';

export const containerStyles = tv({
  base: 'w-full h-full max-w-[30rem] flex flex-col items-center justify-between mob:px-4',
});

export const contentStyles = tv({
  base: 'mt-8 animate-fadeIn',
  variants: {
    contentType: {
      textfield: '',
      buttons: 'flex justify-center gap-x-4',
    },
    step: {
      true: '',
      false: 'hidden',
    },
  },
});

import { tv } from 'tailwind-variants';

export const stempStyles = tv({
  base: 'absolute opacity-70 ',
  variants: {
    size: {
      M: 'w-48 h-48 left-[60%] bottom-[68%]',
      T: 'w-48 h-48 left-[67%] bottom-[24%]',
      D: 'w-48 h-48 left-[67%] bottom-[24%]',
    },
  },
});

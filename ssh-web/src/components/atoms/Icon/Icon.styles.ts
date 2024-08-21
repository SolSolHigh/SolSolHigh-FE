import { tv } from 'tailwind-variants';

export const iconStyles = tv({
  variants: {
    color: {
      primary: 'text-primary-500',
      secondary: 'text-secondary-500',
      danger: 'text-danger-500',
      warning: 'text-warning-500',
      dark: 'text-black',
      light: 'text-white',
    },
    size: {
      xs: 'text-base',
      sm: 'text-xl',
      md: 'text-2xl',
      lg: 'text-[1.75rem]',
      xl: 'text-[2rem]',
    },
  },
});

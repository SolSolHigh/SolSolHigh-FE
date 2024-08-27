import { tv } from 'tailwind-variants';

export const profileIconStyles = tv({
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
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      light: 'font-light',
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
});

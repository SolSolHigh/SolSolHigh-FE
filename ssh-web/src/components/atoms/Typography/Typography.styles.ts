import { tv } from 'tailwind-variants';

export const typographyStyles = tv({
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
      '3xs': 'text-[0.5rem]',
      '2xs': 'text-[0.625rem]',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-[1.375rem]',
      '3xl': 'text-2xl',
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

import { tv } from 'tailwind-variants';

export const barStyles = tv({
  base: '',
  variants: {
    color: {
      primary: 'bg-primary-500',
      secondary: 'bg-secondary-800',
      danger: 'bg-danger-500',
      warning: 'bg-warning-500',
      dark: 'bg-black',
      light: 'bg-white text-dark',
    },
    size: {
      sm: 'h-4 w-64',
      md: 'h-6 w-96',
      lg: 'h-8 w-[32rem]',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'outlined',
    size: 'md',
  },
});

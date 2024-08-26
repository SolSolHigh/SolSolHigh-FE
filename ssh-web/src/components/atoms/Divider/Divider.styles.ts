import { tv } from 'tailwind-variants';

export const dividerStyles = tv({
  base: 'w-full',
  variants: {
    color: {
      light: 'bg-gray-200',
      dark: 'bg-gray-600',
      primary: 'bg-primary-400',
    },
    thickness: {
      thin: 'h-px',
      medium: 'h-0.5',
      thick: 'h-1',
    },
  },
  defaultVariants: {
    color: 'light',
    thickness: 'thin',
  },
});

// TextField.styles.ts
import { tv } from 'tailwind-variants';

export const textFieldStyles = tv({
  base: 'p-2 font-medium w-64 relative', 
  variants: {
    variant: {
      outlined: 'border-2 rounded-md ',
      standard: 'border-b-2',
    },
    state: {
      primary: 'border-blue-500',
      secondary: 'border-gray-500',
      danger: 'border-red-500',
      unfocused: 'border-gray-300',
    },
    size: {
      xs: 'text-xs p-1 w-40',
      sm: 'text-sm p-1.5 w-48',
      md: 'text-base p-2 w-56',
      lg: 'text-lg p-2.5 w-64',
      xl: 'text-xl p-3 w-72',
    },
  },
  defaultVariants: {
    variant: 'outlined',
    state: 'secondary',
    size: 'md', 
  },
});

export const labelStyles = tv({
  base: 'block font-medium mb-1 transition-all', 
  variants: {
    state: {
      primary: 'text-blue-500',
      secondary: 'text-gray-500',
      danger: 'text-red-500',
      unfocused: 'text-gray-300',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
});

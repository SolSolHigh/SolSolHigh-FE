// TextField.styles.ts
import { tv } from 'tailwind-variants';

export const textFieldStyles = tv({
  base: 'p-2 font-medium relative', 
  variants: {
    variant: {
      outlined: 'border-2 rounded-md ',
      standard: 'border-b-2',
    },
    state: {
      primary: 'border-primary-500',
      secondary: 'border-secondary-800',
      danger: 'border-danger-500',
      unfocused: 'border-secondary-400',
    },
    size: {
      xs: 'text-xs p-1',
      sm: 'text-sm p-1.5',
      md: 'text-base p-2',
      lg: 'text-lg p-2.5',
      xl: 'text-xl p-3',
    },
    fullWidth: {
      true: 'w-full',   
    },
    disabled: {
      true: 'bg-secondary-200 text-secondary-600 cursor-not-allowed rounded',
    },
  },
  defaultVariants: {
    variant: 'outlined',
    size: 'md', 
  },
});
 
export const labelStyles = tv({
  base: 'block font-medium mb-1 transition-all', 
  variants: {
    state: {
      primary: 'text-primary-500',
      secondary: 'text-secondary-800',
      danger: 'text-danger-500',
      unfocused : 'text-secondary-600',
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

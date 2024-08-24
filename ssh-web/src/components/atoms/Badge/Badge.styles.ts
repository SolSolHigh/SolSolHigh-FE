import { tv } from 'tailwind-variants';

const backgroundVariants = {
  primary: 'bg-primary-500 hover:bg-primary-400 active:bg-primary-700',
  secondary: 'bg-secondary-500 hover:bg-secondary-400 active:bg-secondary-700',
  danger: 'bg-red-500 hover:bg-red-400 active:bg-red-700',
  warning: 'bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-700',
  dark: 'bg-black hover:bg-gray-800 active:bg-gray-900',
  light: 'bg-white hover:bg-gray-100 active:bg-gray-200',
};

const textVariants = {
  primary: 'text-primary-500',
  secondary: 'text-secondary-500',
  danger: 'text-red-500',
  warning: 'text-yellow-500',
  dark: 'text-black',
  light: 'text-white',
};

export const badgeStyles = tv({
  base: 'inline-flex items-center justify-center rounded-full px-2 py-1 h-max transition-colors duration-300 ease-in-out cursor-default',
  variants: {
    color: {
      primary: backgroundVariants.primary,
      secondary: backgroundVariants.secondary,
      danger: backgroundVariants.danger,
      warning: backgroundVariants.warning,
      dark: backgroundVariants.dark,
      light: backgroundVariants.light,
    },
    textColor: {
      primary: textVariants.primary,
      secondary: textVariants.secondary,
      danger: textVariants.danger,
      warning: textVariants.warning,
      dark: textVariants.dark,
      light: textVariants.light,
    },
    size: {
      xs: 'text-xs px-2 py-1',
      sm: 'text-sm px-3 py-1',
      md: 'text-base px-4 py-1.5',
      lg: 'text-lg px-5 py-2',
      xl: 'text-xl px-6 py-2.5',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
    textColor: 'light',
  },
});

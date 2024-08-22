import { tv } from 'tailwind-variants';

const createButtonColorVariants = (color: string) => ({
  normal: `bg-${color}-500 hover:bg-${color}-400 active:bg-${color}-700 text-white`,
  outlined: `border-2 border-${color}-500 hover:border-${color}-600 active:border-${color}-700 text-${color}-500 hover:text-${color}-700 active:text-${color}-900 hover:bg-${color}-50 active:bg-${color}-100`,
});

const variants = {
  primary: createButtonColorVariants('primary'),
  secondary: createButtonColorVariants('secondary'),
  danger: createButtonColorVariants('danger'),
  warning: createButtonColorVariants('warning'),
  dark: {
    normal: 'bg-black hover:bg-gray-800 active:bg-gray-900 text-white',
    outlined:
      'border-2 border-black hover:border-gray-800 active:border-gray-900 text-black hover:text-gray-700 active:text-gray-900 hover:bg-gray-100 active:bg-gray-200',
  },
  light: {
    normal: 'bg-white hover:bg-gray-100 active:bg-gray-200 text-black',
    outlined:
      'border-2 border-white hover:border-gray-100 active:border-gray-200 text-white hover:text-gray-500 active:text-gray-700 hover:bg-gray-50 active:bg-gray-100',
  },
  disabled: 'bg-secondary-300 text-white cursor-not-allowed',
};

export const buttonStyles = tv({
  base: 'w-max flex items-center justify-center rounded-md focus:outline-none transition-all duration-500 shadow-sm hover:shadow-md active:shadow-sm',
  variants: {
    bg: {
      primary: variants.primary.normal,
      secondary: variants.secondary.normal,
      danger: variants.danger.normal,
      warning: variants.warning.normal,
      dark: variants.dark.normal,
      light: variants.light.normal,
      none: 'bg-transparent',
      disabled: variants.disabled,
    },
    borderColor: {
      primary: variants.primary.outlined,
      secondary: variants.secondary.outlined,
      danger: variants.danger.outlined,
      warning: variants.warning.outlined,
      dark: variants.dark.outlined,
      light: variants.light.outlined,
      none: 'border-2 border-transparent hover:border-gray-200 active:border-gray-400',
    },
    text: {
      primary: variants.primary.normal,
      secondary: variants.secondary.normal,
      danger: variants.danger.normal,
      warning: variants.warning.normal,
      dark: variants.dark.normal,
      light: variants.light.normal,
      outlined_primary: variants.primary.outlined,
      outlined_secondary: variants.secondary.outlined,
      outlined_danger: variants.danger.outlined,
      outlined_warning: variants.warning.outlined,
      outlined_dark: variants.dark.outlined,
      outlined_light: variants.light.outlined,
      none: '',
      disabled: variants.disabled,
    },
    size: {
      sm: 'px-4 py-2 text-sm max-h-10',
      md: 'px-5 py-2 max-h-12',
      lg: 'px-6 py-3 max-h-14 text-lg',
    },
    rounded: {
      true: 'rounded-full',
      false: 'rounded-md',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-max',
    },
  },
  defaultVariants: {
    size: 'md',
    bg: 'primary',
    rounded: false,
    fullWidth: false,
  },
});

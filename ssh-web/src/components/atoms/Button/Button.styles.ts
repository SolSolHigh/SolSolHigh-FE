import { tv } from 'tailwind-variants';

const variants = {
  blue: {
    normal: 'bg-blue-500 hover:bg-blue-400 active:bg-blue-700 text-white',
    outlined:
      'border-2 border-blue-500 hover:border-blue-600 active:border-blue-700 text-blue-500 hover:text-blue-700 active:text-blue-900 hover:bg-blue-50 active:bg-blue-100',
  },
  gray: {
    normal: 'bg-gray-500 hover:bg-gray-400 active:bg-gray-600 text-white',
    outlined:
      'border-2 border-gray-500 hover:border-gray-600 active:border-gray-700 text-gray-500 hover:text-gray-700 active:text-gray-900 hover:bg-gray-50 active:bg-gray-100',
  },
  primary: {
    normal:
      'bg-primary-500 hover:bg-primary-400 active:bg-primary-700 text-white',
    outlined:
      'border-2 border-primary-500 hover:border-primary-600 active:border-primary-700 text-primary-500 hover:text-primary-700 active:text-primary-900 hover:bg-primary-50 active:bg-primary-100',
  },
  secondary: {
    normal:
      'bg-secondary-500 hover:bg-secondary-400 active:bg-secondary-700 text-white',
    outlined:
      'border-2 border-secondary-500 hover:border-secondary-600 active:border-secondary-700 text-secondary-500 hover:text-secondary-700 active:text-secondary-900 hover:bg-secondary-50 active:bg-secondary-100',
  },
  danger: {
    normal: 'bg-red-500 hover:bg-red-400 active:bg-red-700 text-white',
    outlined:
      'border-2 border-red-500 hover:border-red-600 active:border-red-700 text-red-500 hover:text-red-700 active:text-red-900 hover:bg-red-50 active:bg-red-100',
  },
  warning: {
    normal: 'bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-700 text-white',
    outlined:
      'border-2 border-yellow-500 hover:border-yellow-600 active:border-yellow-700 text-yellow-500 hover:text-yellow-700 active:text-yellow-900 hover:bg-yellow-50 active:bg-yellow-100',
  },
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
  base: 'w-max flex items-center justify-center rounded-md focus:outline-none transition duration-500 shadow-sm hover:shadow-md active:shadow-sm',
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
      sm: 'px-3 py-2 text-sm max-h-10',
      md: 'px-4 py-2 max-h-12',
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

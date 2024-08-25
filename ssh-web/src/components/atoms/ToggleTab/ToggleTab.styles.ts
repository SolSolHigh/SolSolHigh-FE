import { tv } from 'tailwind-variants';

export const toggleTabContainerStyles = tv({
  base: 'flex justify-center w-full',
});

export const toggleTabStyles = tv({
  base: 'relative flex overflow-hidden w-full h-12',
  variants: {
    outlined: {
      true: 'bg-transparent rounded-none border-b-[0.05rem] border-b-secondary-300',
      false: 'bg-primary-100 rounded-xl',
    },
    color: {
      primary: '',
      dark: '',
      danger: '',
    },
  },
});

export const tabButtonStyles = tv({
  base: 'flex-1 text-center z-10 py-2 cursor-pointer transition-colors duration-300 ease-in-out',
  variants: {
    isActive: {
      true: '',
      false: '',
    },
    outlined: {
      true: '',
      false: '',
    },
    color: {
      primary: '',
      dark: '',
      danger: '',
    },
  },
});

export const sliderStyles = tv({
  base: 'absolute bottom-0 h-[0.05rem] w-1/2 rounded-xl transition-transform duration-300 ease-in-out',
  variants: {
    activeTab: {
      0: 'transform translate-x-0',
      1: 'transform translate-x-full',
    },
    outlined: {
      true: '',
      false: 'h-full',
    },
    color: {
      primary: 'bg-primary-500',
      dark: 'bg-black',
      danger: 'bg-danger-500',
    },
  },
});

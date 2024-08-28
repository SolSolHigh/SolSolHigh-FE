import { tv } from 'tailwind-variants';

export const ModalContentStyles = {
  container: tv({
    base: 'flex flex-col items-center justify-center rounded-lg bg-white w-full',
    variants: {
      size: {
        M: 'p-4',
        T: 'p-6',
        D: 'p-8',
      },
    },
  }),
  title: tv({
    base: 'text-2xl font-bold mb-4 text-center',
    variants: {
      size: {
        M: 'text-xl mb-2',
        T: 'text-2xl mb-3',
        D: 'text-3xl mb-4',
      },
    },
  }),
  image: tv({
    base: 'mb-4',
    variants: {
      size: {
        M: 'w-24 h-24',
        T: 'w-36 h-36',
        D: 'w-48 h-48',
      },
    },
  }),
  caption: tv({
    base: 'text-sm text-gray-600 mb-4 text-center',
    variants: {
      size: {
        M: 'text-xs',
        T: 'text-sm',
        D: 'text-md',
      },
    },
  }),
};
export const containerStyles = tv({
  base: 'flex items-center justify-center w-full h-auto tablet:flex-col',
});

export const mascotWrapperStyles = tv({
  base: 'flex items-center justify-center w-full',
});

export const container = tv({
  base: 'bg-secondary-100 rounded-lg flex flex-col justify-around shadow-md w-full mt-16',
  variants: {
    size: {
      M: 'p-4 max-w-screen-sm',
      T: 'p-6 max-w-[768px]',
      D: 'p-8 mt-16 max-w-[768px] h-[48rem]',
    },
  },
});

export const title = tv({
  base: 'text-center rounded mb-4',
  variants: {
    size: {
      M: 'text-md mb-2',
      T: 'text-lg mb-3',
      D: 'text-xl mb-4',
    },
  },
});

export const button = tv({
  base: 'flex items-center justify-center rounded-full mb-4 p-6 px-8 border transition-all duration-500 ease-in-out',
  variants: {
    variant: {
      correct: 'bg-green-500 text-white border-green-500',
      incorrect: 'bg-danger-500 text-white border-red-500',
      default: 'bg-secondary-300 text-gray-600 border-gray-300',
    },
    selected: {
      true: 'ring-2 ring-primary-400',
      false: '',
    },
    size: {
      M: 'w-16 h-16',
      T: 'w-18 h-18',
      D: 'w-20 h-20',
    },
  },
});

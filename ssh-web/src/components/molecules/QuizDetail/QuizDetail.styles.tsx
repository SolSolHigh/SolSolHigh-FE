import { tv } from 'tailwind-variants';

export const quizContent = tv({
  base: 'bg-white p-4 rounded-lg shadow mb-4',
  variants: {
    size: {
      M: 'p-4',
      T: 'p-6',
      D: 'p-8',
    },
  },
});

export const keyword = tv({
  base: 'text-sm text-gray-600 mt-8 mb-4 flex justify-center space-x-2',
  variants: {
    size: {
      M: 'text-xs space-x-1',
      T: 'text-sm space-x-2',
      D: 'text-md space-x-3',
    },
  },
});
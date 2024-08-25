import { tv } from 'tailwind-variants';

export const missionCardStyles = tv({
  base: 'flex items-center justify-between w-full p-4 rounded-3xl transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:bg-opacity-90',
  variants: {
    isFinished: {
      true: 'bg-secondary-100 hover:bg-secondary-200',
      false: 'bg-primary-100 hover:bg-primary-200',
    },
  },
});

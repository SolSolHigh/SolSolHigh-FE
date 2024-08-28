import { tv } from 'tailwind-variants';

export const cardStyle = tv({
  base: 'flex flex-col p-4 bg-primary-100 items-center rounded-lg shadow-md relative hover:bg-primary-200 transition duration-300',
  variants: {
    size: {
      M: 'w-32 h-48',
      T: 'w-32 h-48',
      D: 'w-32 h-48',
    },
  },
});

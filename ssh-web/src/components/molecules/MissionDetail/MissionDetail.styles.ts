import { tv } from 'tailwind-variants';

export const missionContent = tv({
  base: 'flex flex-col w-full px-4 items-center justify-center bg-white gap-4',
  variants: {
    size: {
      M: 'p-4',
      T: 'p-6',
      D: 'p-8',
    },
  },
});

export const dividerStyles = tv({
  base: '',
  variants: {
    color: {
      primary: 'bg-primary-400',
      light: 'bg-gray-200',
      dark: 'bg-gray-600',
    },
    thickness: {
      thin: 'h-px',
      medium: 'h-0.5',
      thick: 'h-1',
    },
  },
  defaultVariants: {
    color: 'primary',
    thickness: 'medium',
  },
});

export const badgeStyles = tv({
  base: 'px-2 py-1 rounded-full',
  variants: {
    color: {
      primary: 'bg-primary-500 text-white',
      secondary: 'bg-secondary-500 text-white',
      light: 'bg-white text-gray-700',
    },
  },
});

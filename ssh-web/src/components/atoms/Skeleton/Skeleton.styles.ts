import { tv } from 'tailwind-variants';

const variants = {
  text: 'h-4 rounded',
  circular: 'rounded-full',
  rectangular: 'rounded-md',
};

export const skeletonStyles = tv({
  base: 'bg-gray-800 animate-shimmer bg-gradient-shimmer bg-[length:200%_100%]',
  variants: {
    variant: {
      text: variants.text,
      circular: variants.circular,
      rectangular: variants.rectangular,
    },
  },
  defaultVariants: {
    variant: 'text',
  },
});

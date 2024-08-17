// src/components/Button.tsx
import React from 'react';
import { tv, VariantProps } from 'tailwind-variants';

// Tailwind Variants 설정
const buttonStyles = tv({
  base: 'px-4 py-2 font-semibold text-white rounded-lg',
  variants: {
    variant: {
      primary: 'bg-blue-500 hover:bg-blue-600',
      secondary: 'bg-gray-500 hover:bg-gray-600',
      danger: 'bg-red-500 hover:bg-red-600',
    },
    size: {
      small: 'text-sm',
      medium: 'text-md',
      large: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

// 버튼 컴포넌트 타입 정의
export interface ButtonProps extends VariantProps<typeof buttonStyles> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, size, children }) => {
  return (
    <button className={buttonStyles({ variant, size })}>
      {children}
    </button>
  );
};

export default Button;

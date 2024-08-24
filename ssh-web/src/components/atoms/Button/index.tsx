import React from 'react';
import { buttonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button = ({
  children,
  type = 'button',
  color = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  outlined = false,
  rounded = false,
  fullWidth = false,
  classNameStyles,
}: ButtonProps) => {
  const className = buttonStyles({
    bg: disabled ? 'disabled' : outlined ? 'none' : color,
    borderColor: disabled ? 'none' : outlined ? color : 'none',
    text: disabled ? 'disabled' : outlined ? `outlined_${color}` : color,
    size,
    rounded,
    fullWidth,
  });

  return (
    <button
      type={type}
      className={`${className} ${classNameStyles}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

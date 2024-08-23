import React from 'react';
import { TColor } from '../../../themes/themeBase';

export type TButtonTypes = 'button' | 'submit' | 'reset';
export type TButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: TButtonTypes;
  color?: TColor;
  size?: TButtonSize;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  outlined?: boolean;
  rounded?: boolean;
  fullWidth?: boolean;
  classNameStyles?: string;
}

import { TColor } from '../../../themes/themeBase';
import { ReactNode } from 'react';

export interface IBadgeProps {
  text: string;
  color?: TColor;
  textColor?: TColor;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  startIcon?: ReactNode;
  classNameStyles?: string;
}

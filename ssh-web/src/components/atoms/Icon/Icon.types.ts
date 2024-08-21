import React from 'react';
import { TColor } from '../../../interfaces/globalStyles';

export type TIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps extends React.ComponentProps<'span'> {
  children: React.ReactNode;
  size: TIconSize;
  color: TColor;
  classNameStyles?: string;
}

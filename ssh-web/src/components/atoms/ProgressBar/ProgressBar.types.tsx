import { TColor } from '../../../themes/themeBase';

export type TBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  percent: number;
  color?: TColor;
  size?: TBarSize;
  fullWidth?: boolean;
  classNameStyles?: string;
}

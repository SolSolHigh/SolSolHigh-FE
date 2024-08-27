import { TColor } from '../../../themes/themeBase';

export type TProfileIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TProfileIconWeight =
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold';

export interface ProfileIconProps extends React.ComponentProps<'div'> {
  children: string;
  size?: TProfileIconSize;
  weight?: TProfileIconWeight;
  color?: TColor;
  classNameStyles?: string;
}

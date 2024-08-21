import { TColor } from '../../../themes/themeBase';

export type TTypographySize =
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl';

export type TTypographyWeight =
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold';

export interface TypographyProps extends React.ComponentProps<'div'> {
  children: string;
  size?: TTypographySize;
  color?: TColor;
  weight?: TTypographyWeight;
  classNameStyles?: string;
}

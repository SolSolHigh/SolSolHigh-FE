import { ReactNode } from 'react';
import { TPlatform } from '../../../themes/themeBase';

export interface MascotProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  platform: TPlatform;
  nickname: string;
  ment: string;
  classNameStyles?: string;
}

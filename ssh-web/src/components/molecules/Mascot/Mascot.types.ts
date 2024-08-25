import { ReactNode } from 'react';

export interface MascotProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  nickname: string;
  ment: string;
  classNameStyles?: string;
}

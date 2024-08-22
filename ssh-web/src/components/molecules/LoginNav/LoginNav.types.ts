import { ReactNode } from 'react';

export interface LoginNavProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  classNameStyles?: string;
}

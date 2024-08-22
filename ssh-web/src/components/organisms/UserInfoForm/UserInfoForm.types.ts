import { ReactNode } from 'react';

export interface UserInfoFromProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  classNameStyles?: string;
}

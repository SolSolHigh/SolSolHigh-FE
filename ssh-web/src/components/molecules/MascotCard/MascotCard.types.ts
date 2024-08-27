import { ReactNode } from 'react';
import { IChild } from '../../../interfaces/userInterface';

export interface MascotCardProps extends React.ComponentProps<'div'> {
  childInfo: IChild;
  isWaiting?: boolean;
  withTrash?: boolean;
  children?: ReactNode;
  classNameStyles?: string;
}

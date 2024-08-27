import { ReactNode } from 'react';
import { IChild, IParent } from '../../../interfaces/userInterface';

export interface MascotCardProps extends React.ComponentProps<'div'> {
  info: IChild | IParent;
  type: 'PARENT' | 'CHILD';
  isWaiting?: boolean;
  withTrash?: boolean;
  children?: ReactNode;
  classNameStyles?: string;
}

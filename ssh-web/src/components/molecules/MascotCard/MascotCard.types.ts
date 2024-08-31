import { ReactNode } from 'react';
import { IChild, IParent, IRequest } from '../../../interfaces/userInterface';

export interface MascotCardProps extends React.ComponentProps<'div'> {
  info: IChild | IParent | IRequest;
  type: 'PARENT' | 'CHILD';
  isWaiting?: boolean;
  withTrash?: boolean;
  seleced?: boolean;
  children?: ReactNode;
  classNameStyles?: string;
}

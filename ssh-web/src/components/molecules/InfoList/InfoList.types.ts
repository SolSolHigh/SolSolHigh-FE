import { ReactNode } from 'react';
import {
  IUserInfoInfo,
  IUserInfoMascot,
} from '../../../interfaces/userInterface';

export interface InfoListProps extends React.ComponentProps<'div'> {
  type: 'info' | 'mascot';
  title: string;
  infos?: IUserInfoInfo[];
  mascotType?: string;
  mascots?: IUserInfoMascot[];
  hasMore?: boolean;
  children?: ReactNode;
  classNameStyles?: string;
}

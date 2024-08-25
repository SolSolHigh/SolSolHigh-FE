import { ReactNode } from 'react';

export interface NumberDialProps extends React.ComponentProps<'div'> {
  min: number;
  max: number;
  defaultNumber: number;
  specialNumber?: number;
  specialMent?: string;
  onChangeNumber: (value: number) => void;
  children?: ReactNode;
  classNameStyles?: string;
}

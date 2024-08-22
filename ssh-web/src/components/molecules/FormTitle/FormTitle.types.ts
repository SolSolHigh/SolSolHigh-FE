import { ReactNode } from 'react';

export interface FormTitleProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  keyword: string;
  ment: string;
  steps: number;
  curStep: number;
  onChangeStep: (nextStep: number) => void;
  classNameStyles?: string;
}

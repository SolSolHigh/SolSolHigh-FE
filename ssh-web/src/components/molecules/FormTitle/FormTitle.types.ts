import { ReactNode } from 'react';

export interface FormTitleProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  keyword: string;
  ment: string;
  classNameStyles?: string;
}

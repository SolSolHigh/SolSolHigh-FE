import { ReactNode } from 'react';

export interface BirthdayFormProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  classNameStyles?: string;
}

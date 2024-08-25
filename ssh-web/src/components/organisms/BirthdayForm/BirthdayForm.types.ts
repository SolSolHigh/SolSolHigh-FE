import { ReactNode } from 'react';

export interface BirthdayFormProps extends React.ComponentProps<'div'> {
  defaultYear: number;
  defaultMonth: number;
  defaultDay: number;
  handler: (year: number, month: number, day: number) => void;
  children?: ReactNode;
  classNameStyles?: string;
}

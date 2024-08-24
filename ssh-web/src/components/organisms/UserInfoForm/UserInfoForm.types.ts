import { ReactNode } from 'react';
import { IContent, IContentHandler } from '../../../interfaces/userInterface';

export interface UserInfoFormProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  contents: IContent[];
  onContentHandler: (idx: number, value: ReactNode) => void;
  handler: IContentHandler;
  classNameStyles?: string;
}

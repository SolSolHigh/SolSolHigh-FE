import { ReactNode } from 'react';

export interface ICircularImageProps {
  imageUrl: string;
  altText: string;
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  bgColor?:
    | 'pink'
    | 'blue'
    | 'green'
    | 'yellow'
    | 'purple'
    | 'orange'
    | 'gray'
    | 'red'
    | 'teal'
    | 'indigo';
  classNameStyles?: string;
  children?: ReactNode;
}

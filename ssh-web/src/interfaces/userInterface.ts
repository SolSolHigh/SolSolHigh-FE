import { ReactNode } from 'react';

export interface IContent {
  key: string;
  keyword: string;
  contentType: 'textfield' | 'buttons' | 'numberdial';
  ment: string;
  value: ReactNode;
  valueList?: ReactNode[];
  dialPage?: (page: string) => void;
}

export interface IContentHandler {
  label: string;
  handler: () => void;
}

export interface ISignupRequest {
  nickname: string;
  birthday: string;
  gender: 'MALE' | 'FEMALE';
  type: 'parent' | 'child';
}

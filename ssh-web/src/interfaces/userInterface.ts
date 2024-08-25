import { ReactNode } from 'react';

export interface IContent {
  key: string;
  keyword: string;
  contentType: 'textfield' | 'buttons';
  ment: string;
  value: ReactNode;
  valueList?: ReactNode[];
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

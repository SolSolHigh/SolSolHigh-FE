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
  code: string;
  nickname: string;
  birthday: string;
  gender: 'MALE' | 'FEMALE';
  type: 'parent' | 'child';
}

export interface IUserInfoInfo {
  label: string;
  content: string;
}

export interface IUserInfoMascot {
  src: string;
  label: string;
}

export interface IChild {
  name: string;
  nickname: string;
  birthday: string;
}

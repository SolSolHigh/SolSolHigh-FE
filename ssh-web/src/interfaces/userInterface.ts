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
  gender: 'M' | 'F';
  type: 'PARENT' | 'CHILD';
}

export interface IUserInfo {
  nickname: string;
  email: string;
  name: string;
  gender: string;
  birthday: string;
  type: string;
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
  gender: string;
}

export interface IParent {
  name: string;
  nickname: string;
  birthday: string;
  gender: string;
}

export interface IRequest {
  requestId: number;
  createdAt: string;
  nickname: string;
  name: string;
  gender: string;
  birthday: string;
}

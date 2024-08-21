import React from 'react';
import { LoginNavProps } from './LoginNav.types';
import { loginNavStyles } from './LoginNav.styles';

export const LoginNav = ({ children, classNameStyles }: LoginNavProps) => {
  return (
    <div className={`${loginNavStyles()} ${classNameStyles}`}>
      <img src="/assets/naver_login.png" className="w-full max-w-[22.5rem]" />
      <img src="/assets/kakao_login.png" className="w-full max-w-[22.5rem]" />
      {children}
    </div>
  );
};

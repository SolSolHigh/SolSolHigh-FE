import React from 'react';
import { LoginNavProps } from './LoginNav.types';
import { loginNavStyles } from './LoginNav.styles';

export const LoginNav = ({ children, classNameStyles }: LoginNavProps) => {
  console.log('it"s for test');
  return (
    <div className={`${loginNavStyles()} ${classNameStyles}`}>
      <a href="https://www.solsol-high.kro.kr/api/oauth2/authorization/naver">
        <img src="/assets/naver_login.png" className="w-full max-w-[22.5rem]" />
      </a>
      <a href="https://www.solsol-high.kro.kr/api/oauth2/authorization/kakao">
        <img src="/assets/kakao_login.png" className="w-full max-w-[22.5rem]" />
      </a>
      {children}
    </div>
  );
};

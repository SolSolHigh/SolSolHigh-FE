import React from 'react';
import { LoginNavProps } from './LoginNav.types';
import { loginNavStyles } from './LoginNav.styles';
import axios from 'axios';

export const LoginNav = ({ children, classNameStyles }: LoginNavProps) => {
  return (
    <div className={`${loginNavStyles()} ${classNameStyles}`}>
      <a href="https://solsol-high.com/api/oauth2/authorization/naver">helo</a>
      <img
        src="/assets/naver_login.png"
        className="w-full max-w-[22.5rem]"
        onClick={async () => {
          await fetch('https://solsol-high.com/api/oauth2/authorization/naver')
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }}
      />
      <img
        src="/assets/kakao_login.png"
        className="w-full max-w-[22.5rem]"
        onClick={async () => {
          await axios
            .get('https://solsol-high.com/api/oauth2/authorization/naver')
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }}
      />
      {children}
    </div>
  );
};

import React from 'react';
import { Typography } from '../../components/atoms/Typography';
import { LoginNav } from '../../components/molecules/LoginNav';
import { containerStyles } from './styles';

export const Login = () => {
  return (
    <div className={containerStyles()}>
      <Typography
        color="dark"
        weight="bold"
        size="7xl"
        classNameStyles="tablet:text-xl"
      >
        쏠쏠-하이
      </Typography>
      <Typography
        color="dark"
        weight="medium"
        size="2xl"
        classNameStyles="tablet:text-base"
      >
        반가워요! 찾아와줘서 고마워요
      </Typography>
      <img src="/assets/mascot_top.png" className="mt-4 tablet:w-80" />
      <LoginNav />
    </div>
  );
};

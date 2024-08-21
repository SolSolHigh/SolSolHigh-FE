import React from 'react';
import { Typography } from '../../components/atoms/Typography';
import { LoginNav } from '../../components/molecules/LoginNav';
import { useRecoilValue } from 'recoil';
import { platformState } from '../../atoms/platformAtom';

export const Login = () => {
  const platform = useRecoilValue(platformState);

  return (
    <div className="flex flex-col items-center w-full h-full desktop:justify-center tablet:mt-40">
      <Typography
        color="dark"
        weight="bold"
        size={platform === 'W' ? '7xl' : 'xl'}
      >
        쏠쏠-하이
      </Typography>
      <Typography
        color="dark"
        weight="medium"
        size={platform === 'W' ? '2xl' : 'md'}
      >
        반가워요! 찾아와줘서 고마워요
      </Typography>
      <img
        src="/assets/mascot_top.png"
        className={`mt-4 ${platform === 'W' ? '' : 'w-80'}`}
      />
      <LoginNav />
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '../../components/atoms/Typography';
import { LoginNav } from '../../components/molecules/LoginNav';

export const Login = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  useEffect(() => {
    if (pageRef.current) {
      setIsDesktop(pageRef.current.offsetWidth >= 1280);
    }
  }, []);

  return (
    <div
      ref={pageRef}
      className="flex flex-col items-center w-full h-full desktop:justify-center tablet:mt-40"
    >
      <Typography color="dark" weight="bold" size={isDesktop ? '7xl' : 'xl'}>
        쏠쏠-하이
      </Typography>
      <Typography color="dark" weight="medium" size={isDesktop ? '2xl' : 'md'}>
        반가워요! 찾아와줘서 고마워요
      </Typography>
      <img
        src="/assets/mascot_top.png"
        className={`mt-4 ${isDesktop ? '' : 'w-80'}`}
      />
      <LoginNav />
    </div>
  );
};

import React from 'react';
import { Mascot } from '../../components/molecules/Mascot';
import { contentStyles } from './style';

export const Signup = () => {
  return (
    <div className="flex items-center justify-center h-full tablet:flex-col">
      <Mascot nickname="닉네임" ment="반가워요! 몇 가지만 더 물어볼게요" />
      <div className={`${contentStyles()}`}></div>
    </div>
  );
};

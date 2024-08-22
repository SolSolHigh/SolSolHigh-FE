import React from 'react';
import { Mascot } from '../../components/molecules/Mascot';
import { contentStyles } from './style';
import { UserInfoForm } from '../../components/organisms/UserInfoForm';

export const Signup = () => {
  return (
    <div className="flex items-center justify-center h-full tablet:flex-col">
      <Mascot nickname="닉네임" ment="반가워요! 몇 가지만 더 물어볼게요" />
      <div className={contentStyles()}>
        <UserInfoForm />
        <button className="px-8 py-4 text-white rounded-md bg-primary-500">
          버튼
        </button>
      </div>
    </div>
  );
};

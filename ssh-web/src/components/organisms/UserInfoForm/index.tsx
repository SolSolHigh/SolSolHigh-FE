import React, { useCallback, useState } from 'react';
import { FormTitle } from '../../molecules/FormTitle';
import { containerStyles } from './UserInfoForm.styles';

export const UserInfoForm = () => {
  const [step, setStep] = useState<number>(0);
  const [keywords, setKeywords] = useState<string[]>([
    '닉네임',
    '생일',
    '성별',
    '역할',
  ]);
  const [ments, setMents] = useState<string[]>([
    '이 뭐에요?',
    '은 언제에요?',
    '은 뭐에요?',
    '이 뭐에요?',
  ]);
  const onChangeStep = useCallback(
    (nextStep: number) => {
      setStep(() => nextStep);
    },
    [step],
  );

  return (
    <div className={containerStyles()}>
      <FormTitle
        keyword={keywords[step]}
        ment={ments[step]}
        steps={4}
        curStep={step}
        onChangeStep={onChangeStep}
      />
      <div className="visible mt-12 text-center">nickname textfield</div>
      <div
        className={`mt-4 text-center ${step >= 1 ? 'visible' : 'invisible'}`}
      >
        birthday textfield
      </div>
      <div
        className={`flex justify-center mt-8 gap-x-4 ${step >= 2 ? 'visible' : 'invisible'}`}
      >
        <button>남</button>
        <button>여</button>
      </div>
      <div
        className={`flex justify-center mt-8 gap-x-4 ${step == 3 ? 'visible' : 'invisible'}`}
      >
        <button>부모</button>
        <button>자녀</button>
      </div>
    </div>
  );
};

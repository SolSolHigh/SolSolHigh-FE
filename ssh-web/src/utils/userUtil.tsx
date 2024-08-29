import React from 'react';
import { HiBanknotes, HiCheckCircle, HiPuzzlePiece } from 'react-icons/hi2';

export const getImgSrc = (gender: string, type: string) => {
  const baseSrc =
    'https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/models/';

  if (gender === 'MALE') {
    if (type === 'PARENT') return baseSrc + 'man1.png';
    else return baseSrc + 'boy1.png';
  } else {
    if (type === 'PARENT') return baseSrc + 'woman1.png';
    else return baseSrc + 'girl1.png';
  }
};

export const getImgSrcByType = (type: string) => {
  if (type === 'QUIZ') return <HiPuzzlePiece />;
  else if (type === 'DEPOSIT' || type === 'GOAL_MONEY') return <HiBanknotes />;
  else return <HiCheckCircle />;
};

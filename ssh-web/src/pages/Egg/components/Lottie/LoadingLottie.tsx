import React from 'react';
import Lottie from 'lottie-react';

import confettiAnimation from './confetti.json';

export const ConfettiLottie = () => {
  return (
    <Lottie
      style={{ width: '100%', height: '400px' }}
      animationData={confettiAnimation}
    />
  );
};

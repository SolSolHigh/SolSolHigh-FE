import React from 'react';
import Lottie from 'lottie-react';
import confettiAnimation from './confetti.json';

export const ConfettiLottie = () => {
  return (
    <div style={{ position: 'relative', zIndex: 50 }}>
      <Lottie
        style={{ width: '100%', height: '400px', margin: '0 auto' }}
        animationData={confettiAnimation}
        loop={false}
      />
    </div>
  );
};

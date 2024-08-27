import React, { useState } from 'react';
import { Badge } from '../../../components/atoms/Badge';
import { CircularImage } from '../../../components/atoms/CircularImage';
import { Typography } from '../../../components/atoms/Typography';

export const TodayEgg = () => {
  const [collectedAmount, setCollectedAmount] = useState(0);
  const [touchesLeft, setTouchesLeft] = useState(100);
  const [eggBgColor, setEggBgColor] = useState('bg-primary-400');
  const [eggScale, setEggScale] = useState('scale-100');

  const handleEggClick = () => {
    setEggBgColor('bg-primary-300');
    setEggScale('scale-110');

    setTimeout(() => {
      setEggBgColor('bg-primary-400');
      setEggScale('scale-100');
    }, 100);

    setCollectedAmount(collectedAmount + 1);
    setTouchesLeft(touchesLeft - 1);
  };

  return (
    <div className="TAB-CONTENT">
      <div className="text-right">
        <Typography
          weight="bold"
          size="7xl"
          classNameStyles="!text-primary-400 animate-popIn"
        >
          + {collectedAmount}원
        </Typography>
      </div>
      <div className="flex flex-row justify-between w-full items-end mb-5">
        <Badge
          text="2 / 10"
          weight="semibold"
          startIcon={
            <CircularImage
              imgWidth="70%"
              imageUrl="/assets/images/samples/eggs/egg_basic.png"
              altText="eggBadge"
              bgColor="blue"
              size="xs"
            />
          }
        />
        <Typography weight="semibold" classNameStyles="!text-primary-300">
          계란을 눌러서 저금한 돈이에요.
        </Typography>
      </div>
      <div
        onClick={handleEggClick}
        className={`relative ${eggBgColor} flex items-center justify-center overflow-hidden transition-all duration-300 w-full h-[18rem] rounded-t-3xl mb-10 cursor-pointer`}
      >
        <img
          src={'/assets/images/samples/eggs/egg_basic.png'}
          alt={'touchableEgg'}
          style={{ width: '55%', objectFit: 'cover' }}
          className={`rounded-full absolute top-10 transform transition-transform duration-300 ${eggScale}`}
        />
      </div>
      <div className="bg-primary-200 w-full h-24 rounded-3xl items-center flex flex-row justify-center gap-4">
        <Typography
          size="6xl"
          weight="bold"
          classNameStyles="!text-primary-400"
        >
          {touchesLeft}번
        </Typography>
        <Typography size="6xl" weight="bold" color="light">
          더 터치!
        </Typography>
      </div>
    </div>
  );
};

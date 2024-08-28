import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Badge } from '../../../components/atoms/Badge';
import { CircularImage } from '../../../components/atoms/CircularImage';
import { Typography } from '../../../components/atoms/Typography';
import {
  getCurrentEggStatus,
  updateCurrentEggStatus,
} from '../../../apis/eggApi';
import { isModalOpenState } from '../../../atoms/modal';

export const TodayEgg = () => {
  const [collectedAmount, setCollectedAmount] = useState(0);
  const [touchesLeft, setTouchesLeft] = useState(100);
  const [eggBgColor, setEggBgColor] = useState('bg-primary-400');
  const [eggScale, setEggScale] = useState('scale-100');
  const [todayDestroyCount, setTodayDestroyCount] = useState(0);
  const [modalState, setModalState] = useRecoilState(isModalOpenState);

  const fetchEggStatus = async () => {
    try {
      const response = await getCurrentEggStatus();
      const { needHitCount, todayDestroyCount } = response.data;
      setTouchesLeft(needHitCount);
      setTodayDestroyCount(todayDestroyCount);
      setCollectedAmount(100 - needHitCount); // 초기 수집 금액 설정
    } catch (error) {
      console.error('계란 상태 가져오기 실패', error);
    }
  };

  useEffect(() => {
    fetchEggStatus();
  }, []);

  const handleEggClick = async () => {
    if (touchesLeft > 0) {
      // 터치 가능할 때만 동작
      try {
        setEggBgColor('bg-primary-300');
        setEggScale('scale-110');

        setTimeout(() => {
          setEggBgColor('bg-primary-400');
          setEggScale('scale-100');
        }, 100);

        const response = await updateCurrentEggStatus(1);
        const reward = response.data;

        setCollectedAmount((prev) => prev + 1);
        setTouchesLeft((prev) => prev - 1); // 남은 터치 횟수 감소

        if (reward) {
          console.log('보상 도착:', reward);
          setModalState({
            isOpen: true,
            content: (
              <div>
                <img src={reward.imageUrl} alt={reward.specialEggName} />
                <Typography>{reward.specialEggName}</Typography>
              </div>
            ),
          });
        }

        if (touchesLeft === 1) {
          fetchEggStatus(); // 터치 후 남은 횟수가 0이 되면 상태를 새로 가져오기
        }
      } catch (error) {
        console.error('계란 상태 업데이트 실패', error);
      }
    }
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
          text={`${todayDestroyCount} / 10`}
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
          style={{ width: '50%', objectFit: 'cover' }}
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

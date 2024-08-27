import React, { useState } from 'react';
import { EResize } from '../../themes/themeBase';
import { Mascot } from '../../components/molecules/Mascot';
import { Typography } from '../../components/atoms/Typography';
import { ToggleTab } from '../../components/atoms/ToggleTab';
import { resizeState } from '../../atoms/resize';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Modal } from '../../components/molecules/Modal';
import {
  containerStyles,
  mascotWrapperStyles,
  missionListBoxStyles,
  titleBoxStyles,
  contentStyles,
} from './styles';
import { ArrayActiveTitle, EActiveTitle, IActiveTab } from './EggFetch.types';
import {
  ENavigationBgColors,
  navigationBgColorState,
} from '../../atoms/navigation';
import { Badge } from '../../components/atoms/Badge';
import { CircularImage } from '../../components/atoms/CircularImage';

export const EggFetch = () => {
  const size = useRecoilValue(resizeState);
  const setNavigationBgColor = useSetRecoilState(navigationBgColorState);
  setNavigationBgColor(ENavigationBgColors.primary);

  const [role, setRole] = useState<'parent' | 'child'>('parent');
  const [activeTab, setActiveTab] = useState<IActiveTab>({
    index: 0,
    title: EActiveTitle.break,
  });

  const [collectedAmount, setCollectedAmount] = useState(0);
  const [touchesLeft, setTouchesLeft] = useState(100);
  const [eggBgColor, setEggBgColor] = useState('bg-primary-400');
  const [eggScale, setEggScale] = useState('scale-100');

  const TOGGLE_LABELS = ['오늘의 계란이에요', '내가 가진 계란을 봐요'];

  const handleTabChange = (index: number) => {
    setActiveTab({ index: index, title: ArrayActiveTitle[index] });
  };

  const handleEggClick = () => {
    setEggBgColor('bg-primary-200');
    setEggScale('scale-110');

    setTimeout(() => {
      setEggBgColor('bg-primary-400');
      setEggScale('scale-100');
    }, 100); // Revert the changes after 100ms

    setCollectedAmount(collectedAmount + 1);
    setTouchesLeft(touchesLeft - 1);
  };

  return (
    <div className={containerStyles()}>
      {size === EResize.D && (
        <div className={mascotWrapperStyles()}>
          <Mascot
            nickname="닉네임"
            ment="여기서 오늘의 계란을 깨서 저금해보세요!"
          />
        </div>
      )}

      <div className={contentStyles()}>
        <div className={titleBoxStyles()}>
          <Typography size="4xl" color="dark" weight="semibold">
            {activeTab.title}
          </Typography>
          <ToggleTab
            activeTab={activeTab.index}
            onTabChange={handleTabChange}
            labels={TOGGLE_LABELS}
          />
        </div>
        <div className={missionListBoxStyles()}>
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
            className={`relative ${eggBgColor} flex items-center justify-center overflow-hidden transition-all duration-300 w-full h-[20rem] rounded-t-3xl mb-10 cursor-pointer`}
          >
            <img
              src={'/assets/images/samples/eggs/egg_basic.png'}
              alt={'touchableEgg'}
              style={{ width: '60%', objectFit: 'cover' }}
              className={`rounded-full absolute top-10 transform transition-transform duration-300 ${eggScale}`}
            />
          </div>
          <div className="bg-primary-200 w-full h-32 rounded-3xl items-center flex flex-row justify-center gap-4">
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
        <Modal color="light" />
      </div>
    </div>
  );
};

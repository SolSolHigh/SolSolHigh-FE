import React, { useState } from 'react';
import { EResize } from '../../themes/themeBase';
import { Mascot } from '../../components/molecules/Mascot';
import { Typography } from '../../components/atoms/Typography';
import { ToggleTab } from '../../components/atoms/ToggleTab';
import { resizeState } from '../../atoms/resize';
import { useRecoilValue } from 'recoil';
import { Modal } from '../../components/molecules/Modal';
import {
  containerStyles,
  mascotWrapperStyles,
  titleBoxStyles,
  contentStyles,
  missionListBoxStyles,
} from './EggFetch.styles';
import { ArrayActiveTitle, EActiveTitle, IActiveTab } from './EggFetch.types';

import { TodayEgg } from './components/TodayEgg';
import { MySpecialEggs } from './components/MySpecialEggs';

export const EggFetch = () => {
  const size = useRecoilValue(resizeState);

  const [activeTab, setActiveTab] = useState<IActiveTab>({
    index: 0,
    title: EActiveTitle.break,
  });

  const TOGGLE_LABELS = ['오늘의 계란이에요', '내가 가진 계란을 봐요'];

  const handleTabChange = (index: number) => {
    setActiveTab({ index: index, title: ArrayActiveTitle[index] });
  };

  const renderTabContent = () => {
    switch (activeTab.index) {
      case 0:
        return <TodayEgg />;
      case 1:
        return <MySpecialEggs />;
      default:
        return null;
    }
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
        <div className={missionListBoxStyles()}>{renderTabContent()}</div>
        <Modal color="light" />
      </div>
    </div>
  );
};

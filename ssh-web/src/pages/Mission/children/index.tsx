import React, { useState, Suspense } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  containerStyles,
  contentStyles,
  mascotWrapperStyles,
  missionListBoxStyles,
  titleBoxStyles,
} from './styles';
import { ToggleTab } from '../../../components/atoms/ToggleTab';
import { Typography } from '../../../components/atoms/Typography';
import { Modal } from '../../../components/molecules/Modal';
import { Mascot } from '../../../components/molecules/Mascot';
import { resizeState } from '../../../atoms/resize';
import { EResize } from '../../../themes/themeBase';
import { MissionList } from '../../../components/molecules/MissionList';
import { LoadingSkeleton } from './LoadingSkeleton';
import { IMission } from '../../../interfaces/missionInterfaces';
import { api } from '../../../apis/interceptors';
import {
  ENavigationBgColors,
  navigationBgColorState,
} from '../../../atoms/navigation';

const fetchMissions = async (isFinished: boolean): Promise<IMission[]> => {
  const response = await api.get<IMission[]>('/api/children/missions', {
    params: {
      page: 0,
      size: 20,
      'is-finished': isFinished,
    },
  });
  return response.data;
};

const ActiveMissionList = () => {
  const activeMissionsQuery = useSuspenseQuery<IMission[], Error>({
    queryKey: ['missions', 'active'],
    queryFn: () => fetchMissions(false),
    staleTime: 0,
  });

  return <MissionList missions={activeMissionsQuery.data} />;
};

const CompletedMissionList = () => {
  const completedMissionsQuery = useSuspenseQuery<IMission[], Error>({
    queryKey: ['missions', 'completed'],
    queryFn: () => fetchMissions(true),
    staleTime: 0,
  });

  return <MissionList missions={completedMissionsQuery.data} />;
};

export const MissionChildren: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const size = useRecoilValue(resizeState);

  const setNavigationBgColor = useSetRecoilState(navigationBgColorState);
  setNavigationBgColor(ENavigationBgColors.light);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className={containerStyles()}>
      {size === EResize.D && (
        <div className={mascotWrapperStyles()}>
          <Mascot nickname="닉네임" ment="여기서 오늘의 미션을 확인해보세요!" />
        </div>
      )}

      <div className={contentStyles()}>
        <div className={titleBoxStyles()}>
          <Typography size="4xl" color="dark" weight="semibold">
            쏠쏠한 미션
          </Typography>
          <ToggleTab
            activeTab={activeTab}
            onTabChange={handleTabChange}
            labels={['쏠쏠한 미션 보기', '미션 추억 돌아보기']}
          />
        </div>
        <div className={missionListBoxStyles()}>
          {activeTab === 0 ? (
            <Suspense fallback={<LoadingSkeleton />}>
              <ActiveMissionList />
            </Suspense>
          ) : (
            <Suspense fallback={<LoadingSkeleton />}>
              <CompletedMissionList />
            </Suspense>
          )}
        </div>
        <Modal color="light" />
      </div>
    </div>
  );
};

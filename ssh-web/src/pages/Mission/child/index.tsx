import React, { useState, Suspense } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useSuspenseQuery } from '@tanstack/react-query';
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
  containerStyles,
  contentStyles,
  mascotWrapperStyles,
  missionListBoxStyles,
  titleBoxStyles,
} from '../child/styles';
import { Button } from '../../../components/atoms/Button';
import { bigButtonStyles } from './styles';
import { isModalOpenState } from '../../../atoms/modal';
import { MissionCreate } from '../child/MissionCreate';

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

const ActiveMissionList = ({ role }: { role: 'parent' | 'child' }) => {
  const activeMissionsQuery = useSuspenseQuery<IMission[], Error>({
    queryKey: ['missions', 'active'],
    queryFn: () => fetchMissions(false),
    staleTime: 0,
  });

  return <MissionList missions={activeMissionsQuery.data} role={role} />;
};

const CompletedMissionList = ({ role }: { role: 'parent' | 'child' }) => {
  const completedMissionsQuery = useSuspenseQuery<IMission[], Error>({
    queryKey: ['missions', 'completed'],
    queryFn: () => fetchMissions(true),
    staleTime: 0,
  });

  return <MissionList missions={completedMissionsQuery.data} role={role} />;
};

export const MissionFetch: React.FC = () => {
  const [role, setRole] = useState<'parent' | 'child'>('parent');

  const [activeTab, setActiveTab] = useState<number>(0);

  const size = useRecoilValue(resizeState);
  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  const onClickCreateModalOpen = () => {
    setIsModalOpen({ isOpen: true, content: <MissionCreate /> });
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
            {role === 'parent' ? '아이들의 미션' : '쏠쏠한 미션'}
          </Typography>
          <ToggleTab
            activeTab={activeTab}
            onTabChange={setActiveTab}
            labels={
              role === 'parent'
                ? ['아이들의 미션보기', '완료된 미션']
                : ['쏠쏠한 미션보기', '미션 추억 돌아보기']
            }
          />
        </div>
        <div className={missionListBoxStyles()}>
          {activeTab === 0 ? (
            <Suspense fallback={<LoadingSkeleton />}>
              <ActiveMissionList role={role} />
            </Suspense>
          ) : (
            <Suspense fallback={<LoadingSkeleton />}>
              <CompletedMissionList role={role} />
            </Suspense>
          )}
        </div>

        {role === 'parent' && (
          <Button
            classNameStyles={bigButtonStyles()}
            onClick={onClickCreateModalOpen}
          >
            새 미션 등록하기
          </Button>
        )}
        <Modal color="light" />
      </div>
    </div>
  );
};

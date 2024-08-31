import React, { useState, Suspense, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ToggleTab } from '../../components/atoms/ToggleTab';
import { Typography } from '../../components/atoms/Typography';
import { Modal } from '../../components/molecules/Modal';
import { Mascot } from '../../components/molecules/Mascot';
import { resizeState } from '../../atoms/resize';
import { EResize } from '../../themes/themeBase';
import { MissionList } from '../../components/molecules/MissionList';
import { LoadingSkeleton } from './LoadingSkeleton';
import { IPaginatedMissions } from '../../interfaces/missionInterface';
import { api } from '../../apis/interceptors';
import {
  containerStyles,
  contentStyles,
  mascotWrapperStyles,
  missionListBoxStyles,
  titleBoxStyles,
} from './styles';
import { Button } from '../../components/atoms/Button';
import { bigButtonStyles } from './styles';
import { isModalOpenState } from '../../atoms/modal';
import { MissionCreate } from './MissionCreate';
import { getUserInfo } from '../../apis/userApi';

const fetchMissions = async (
  isFinished: boolean,
  page: number,
  size: number,
): Promise<IPaginatedMissions> => {
  const response = await api.get<IPaginatedMissions>(
    '/api/children/missions/query',
    {
      params: {
        page,
        size,
        'is-finished': isFinished,
      },
    },
  );
  return response.data;
};

const ActiveMissionList = ({
  role,
  page,
  size,
}: {
  role: 'parent' | 'child';
  page: number;
  size: number;
}) => {
  const activeMissionsQuery = useSuspenseQuery<IPaginatedMissions, Error>({
    queryKey: ['missions', 'active', page, size],
    queryFn: () => fetchMissions(false, page, size),
    staleTime: 0,
  });

  return (
    <MissionList missions={activeMissionsQuery.data.content} role={role} />
  );
};

const CompletedMissionList = ({
  role,
  page,
  size,
}: {
  role: 'parent' | 'child';
  page: number;
  size: number;
}) => {
  const completedMissionsQuery = useSuspenseQuery<IPaginatedMissions, Error>({
    queryKey: ['missions', 'completed', page, size],
    queryFn: () => fetchMissions(true, page, size),
    staleTime: 0,
  });

  return (
    <MissionList missions={completedMissionsQuery.data.content} role={role} />
  );
};

export const MissionFetch: React.FC = () => {
  const [role, setRole] = useState<'parent' | 'child'>('child');
  const [activeTab, setActiveTab] = useState<number>(0);

  const [activePage, setActivePage] = useState<number>(0);
  const [completedPage, setCompletedPage] = useState<number>(0);
  const [size] = useState<number>(100);

  const sizeState = useRecoilValue(resizeState);
  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        const userType = response.data.type === 'PARENT' ? 'parent' : 'child';
        setRole(userType);
      } catch (error) {
        console.error('내정보 가져오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const onClickCreateModalOpen = () => {
    setIsModalOpen({ isOpen: true, content: <MissionCreate /> });
  };

  const handleNextPage = () => {
    if (activeTab === 0) {
      setActivePage((prev) => prev + 1);
    } else {
      setCompletedPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (activeTab === 0) {
      setActivePage((prev) => (prev > 0 ? prev - 1 : 0));
    } else {
      setCompletedPage((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  return (
    <div className={containerStyles()}>
      {sizeState === EResize.D && (
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
              <ActiveMissionList role={role} page={activePage} size={size} />
            </Suspense>
          ) : (
            <Suspense fallback={<LoadingSkeleton />}>
              <CompletedMissionList
                role={role}
                page={completedPage}
                size={size}
              />
            </Suspense>
          )}
        </div>

        {/* <div className="flex flex-row gap-3">
          <Button
            onClick={handlePreviousPage}
            disabled={activeTab === 0 ? activePage === 0 : completedPage === 0}
          >
            이전
          </Button>
          <Button onClick={handleNextPage}>다음</Button>
        </div> */}

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

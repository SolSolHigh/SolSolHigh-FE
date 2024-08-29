import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IMission } from '../../../interfaces/missionInterface';
import { MissionCard } from '../MissionCard';
import { isModalOpenState } from '../../../atoms/modal';
import { resizeState } from '../../../atoms/resize';
import { MissionDetail } from '../MissionDetail';
import { IMissionListProps } from './MissionList.types';
import { missionListStyles } from './MissionList.styles';
import { Typography } from '../../atoms/Typography';

export const MissionList: React.FC<IMissionListProps> = ({
  missions,
  role,
}) => {
  const setModalState = useSetRecoilState(isModalOpenState);
  const size = useRecoilValue(resizeState);

  const openMissionDetail = (mission: IMission) => {
    setModalState({
      isOpen: true,
      content: <MissionDetail mission={mission} size={size} role={role} />,
    });
  };

  return (
    <div className={missionListStyles()}>
      {missions.length > 0 ? (
        missions.map((mission) => (
          <MissionCard
            key={mission.missionId}
            mission={mission}
            onClick={() => openMissionDetail(mission)}
          />
        ))
      ) : (
        <Typography size="md" color="dark" weight="regular">
          아직 미션이 없습니다.
        </Typography>
      )}
    </div>
  );
};

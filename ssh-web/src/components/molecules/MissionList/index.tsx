import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IMission } from '../../../interfaces/missionInterfaces';
import { MissionCard } from '../MissionCard';
import { isModalOpenState } from '../../../atoms/modal';
import { resizeState } from '../../../atoms/resize';
import { MissionDetail } from '../MissionDetail';
import { IMissionListProps } from './MissionList.types';
import { missionListStyles } from './MissionList.styles';

export const MissionList: React.FC<IMissionListProps> = ({ missions }) => {
  const setModalState = useSetRecoilState(isModalOpenState);
  const size = useRecoilValue(resizeState);

  const openMissionDetail = (mission: IMission) => {
    setModalState({
      isOpen: true,
      content: <MissionDetail mission={mission} size={size} />,
    });
  };

  return (
    <div className={missionListStyles()}>
      {missions.map((mission) => (
        <MissionCard
          key={mission.missionId}
          mission={mission}
          onClick={() => openMissionDetail(mission)}
        />
      ))}
    </div>
  );
};

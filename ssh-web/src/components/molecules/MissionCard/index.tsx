import React from 'react';
import { AvatarWithLabel } from '../../molecules/AvatarWithLabel';
import { Badge } from '../../atoms/Badge';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';
import { HiChevronRight } from 'react-icons/hi2';
import { IMission } from '../../../interfaces/missionInterfaces';
import { missionCardStyles } from './MissionCard.styles';

interface MissionCardProps {
  mission: IMission;
  onClick: () => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  onClick,
}) => {
  const getDifficultyLabel = (level: '1' | '2' | '3'): string => {
    switch (level) {
      case '1':
        return '쉬움';
      case '2':
        return '중간';
      case '3':
        return '어려움';
      default:
        return '';
    }
  };

  return (
    <button
      className={missionCardStyles({ isFinished: mission.isFinished })}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <AvatarWithLabel
          imageUrl={`/assets/images/samples/children/boy3.png`}
          altText={mission.childInfo.name}
          size="lg"
          bgColor="blue"
          label={mission.childInfo.name}
          labelSize="sm"
          labelWeight="bold"
          labelColor="dark"
        />
        <div className="flex flex-col gap-3">
          <Badge
            text={mission.isFinished ? '완료' : '도전중'}
            color={mission.isFinished ? 'secondary' : 'primary'}
            textColor="light"
            size="sm"
            weight="semibold"
          />
          <Typography size="sm" color="dark" weight="regular">
            {mission.description}
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Typography size="sm" color="secondary" weight="regular">
          {getDifficultyLabel(mission.missionLevel)}
        </Typography>
        <Icon size="md" color="secondary">
          <HiChevronRight />
        </Icon>
      </div>
    </button>
  );
};

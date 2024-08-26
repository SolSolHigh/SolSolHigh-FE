import React from 'react';
import { Typography } from '../../atoms/Typography';
import { MissionDetailProps } from './MissionDetail.types';
import { missionContent, badgeStyles } from './MissionDetail.styles';
import { Badge } from '../../atoms/Badge';
import { Divider } from '../../atoms/Divider';

export const MissionDetail = ({ mission, size }: MissionDetailProps) => {
  return (
    <div className={missionContent({ size })}>
      <div className="text-left w-full flex flex-col gap-1">
        <Typography classNameStyles="text-primary-400" size="2xl" weight="bold">
          쏠쏠한 미션
        </Typography>
        <Typography
          size="sm"
          color="primary"
          weight="regular"
          className="text-center"
        >
          미션을 수행하고 부모님에게 약속권을 받아보아요!
        </Typography>
      </div>
      <div className="w-full py-6 px-10 bg-primary-100 rounded-2xl flex flex-col gap-4">
        <div className="flex flex-col items-center gap-1">
          <Typography size="xs" color="primary" weight="regular">
            도전자
          </Typography>
          <Typography size="sm" color="dark" weight="semibold">
            {mission.childInfo.name}
          </Typography>
        </div>
        <Divider color="primary" />
        <div className="flex flex-col items-center gap-1">
          <Typography size="xs" color="primary" weight="regular">
            쏠쏠한 미션명
          </Typography>
          <Typography size="sm" color="dark" weight="semibold">
            {mission.description}
          </Typography>
        </div>
        <Divider color="primary" />
        <div className="flex flex-col items-center gap-1">
          <Typography size="xs" color="primary" weight="regular">
            난이도
          </Typography>
          <Typography size="sm" color="dark" weight="semibold">
            {mission.missionLevel === '1'
              ? '쉬움'
              : mission.missionLevel === '2'
                ? '중간'
                : '어려움'}
          </Typography>
        </div>
        <Divider color="primary" />
        <div className="flex flex-col items-center gap-1">
          <Typography size="xs" color="primary" weight="regular">
            미션 완료 시간
          </Typography>
          <Typography size="sm" color="dark" weight="semibold">
            {mission.isFinished
              ? mission.missionFinishedAt
              : '아직 도전중인 미션이에요.'}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Badge
          size="sm"
          text={mission.isFinished ? '완료됨' : '도전중'}
          color={mission.isFinished ? 'secondary' : 'primary'}
          classNameStyles={badgeStyles({ color: 'primary' })}
        />
        <Typography
          size="xs"
          color="dark"
          weight="regular"
          className="text-center"
        >
          {mission.isFinished
            ? '이 미션은 완료되었습니다.'
            : '미션에 도전하고 있어요.'}
        </Typography>
      </div>
    </div>
  );
};

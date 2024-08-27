import React from 'react';
import { Typography } from '../../atoms/Typography';
import { IMissionDetailProps } from './MissionDetail.types';
import { missionContent, badgeStyles } from './MissionDetail.styles';
import { Badge } from '../../atoms/Badge';
import { Divider } from '../../atoms/Divider';
import { Button } from '../../atoms/Button';
import { updateMissionStatus, deleteMission } from '../../../apis/missionApi';
import { showToast } from '../../../utils/toastUtil';
import { useSetRecoilState } from 'recoil';
import { isModalOpenState } from '../../../atoms/modal';

export const MissionDetail = ({ mission, size, role }: IMissionDetailProps) => {
  // 전체적 리팩토링 필요 : 핸들러 내려받아서 쓰기 등
  const setIsModalOpen = useSetRecoilState(isModalOpenState);
  const handleDelete = async () => {
    try {
      await deleteMission(mission.missionId);
      showToast('success', '미션이 성공적으로 삭제되었습니다.');
      setIsModalOpen({ isOpen: false, content: null });
    } catch (error) {
      showToast('error', '미션 삭제에 실패했습니다.');
      setIsModalOpen({ isOpen: false, content: null });
      console.error('삭제 실패:', error);
    }
  };

  const handleComplete = async () => {
    try {
      await updateMissionStatus(mission.missionId, { isFinished: true });
      showToast('success', '미션이 성공적으로 삭제되었습니다.');
      setIsModalOpen({ isOpen: false, content: null });
    } catch (error) {
      showToast('error', '미션 삭제에 실패했습니다.');
      setIsModalOpen({ isOpen: false, content: null });
      console.error('완료 처리 실패:', error);
    }
  };

  return (
    <div className={missionContent({ size })}>
      <div className="text-left w-full flex flex-col gap-1">
        <Typography classNameStyles="text-primary-400" size="2xl" weight="bold">
          쏠쏠한 미션
        </Typography>
        {role === 'child' && !mission.isFinished && (
          <Typography
            size="sm"
            color="primary"
            weight="regular"
            className="text-center"
          >
            미션을 수행하고 부모님에게 약속권을 받아보아요!
          </Typography>
        )}
      </div>

      {!mission.isFinished && role === 'parent' && (
        <div className="w-full flex flex-row items-start justify-start gap-3">
          <Button
            classNameStyles="!bg-primary-400 hover:bg-primary-300"
            fullWidth
            size="sm"
            onClick={() => console.log('수정 로직을 여기에 추가하세요')}
          >
            수정
          </Button>
          <Button
            classNameStyles="bg-secondary-400 hover:bg-secondary-300"
            fullWidth
            size="sm"
            onClick={handleDelete}
          >
            삭제
          </Button>
        </div>
      )}

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

      {!mission.isFinished && role === 'parent' && (
        <div className="flex justify-between w-full mt-3">
          <Button
            classNameStyles="bg-primary-500 hover:bg-primary-400 !text-lg rounded-2xl !py-3"
            fullWidth
            onClick={handleComplete}
          >
            완료로 처리하기
          </Button>
        </div>
      )}
    </div>
  );
};

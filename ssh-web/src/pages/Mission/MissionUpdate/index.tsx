// src/pages/Mission/MissionUpdate/index.tsx
import React, { useState } from 'react';
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';
import { Typography } from '../../../components/atoms/Typography';
import { Button } from '../../../components/atoms/Button';
import { useSetRecoilState } from 'recoil';
import { isModalOpenState } from '../../../atoms/modal';
import TextField from '../../../components/atoms/TextField';
import { NumberDial } from '../../../components/molecules/NumberDial';
import { missionCreateStyles } from '../MissionCreate/MissionCreate.styles';
import { updateMission } from '../../../apis/missionApi';
import { IMissionUpdateRequest } from '../../../interfaces/missionInterface';
import { tv } from 'tailwind-variants';

interface MissionUpdateProps {
  mission: IMissionUpdateRequest;
  missionId: number;
}

export const MissionUpdate: React.FC<MissionUpdateProps> = ({
  mission,
  missionId,
}) => {
  const [missionDescription, setMissionDescription] = useState(
    mission.description || '',
  );
  const [difficulty, setDifficulty] = useState(
    parseInt(mission.missionLevel || '2'),
  );
  const [missionStartAt, setMissionStartAt] = useState(
    mission.missionStartAt || '',
  );
  const [missionEndAt, setMissionEndAt] = useState(mission.missionEndAt || '');
  const setModalState = useSetRecoilState(isModalOpenState);
  const queryClient = useQueryClient();

  const mutationOptions: UseMutationOptions<
    void,
    Error,
    IMissionUpdateRequest
  > = {
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['missions'] });
      setModalState({ isOpen: false, content: null });
    },
    onError: (error) => {
      setModalState({
        isOpen: true,
        content: (
          <Typography size="lg">
            미션 수정에 실패했습니다. 다시 시도해 주세요.
          </Typography>
        ),
      });
      console.error('Mission update failed:', error);
    },
  };

  const missionMutation = useMutation<void, Error, IMissionUpdateRequest>({
    mutationFn: async (updatedData: IMissionUpdateRequest) => {
      await updateMission(missionId, updatedData);
    },
    ...mutationOptions,
  });

  const handleMissionUpdate = () => {
    const missionData: IMissionUpdateRequest = {
      description: missionDescription,
      missionStartAt,
      missionEndAt,
      missionLevel: difficulty.toString() as '1' | '2' | '3',
    };

    missionMutation.mutate(missionData);
  };

  return (
    <div className={missionCreateStyles()}>
      <div className="text-left w-full flex flex-col">
        <Typography size="2xl" weight="bold">
          미션 수정
        </Typography>
      </div>

      <TextField
        label="미션 설명"
        fullWidth
        size="sm"
        defaultValue={missionDescription}
        onChange={(e) => setMissionDescription(e.target.value)}
        classNameStyles="!mb-0"
      />

      <div className="flex gap-4 w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <label className="text-primary-500">미션 시작 날짜</label>
          <input
            type="date"
            value={missionStartAt.split('T')[0]}
            onChange={(e) =>
              setMissionStartAt(
                `${e.target.value}T${missionStartAt.split('T')[1] || '00:00'}`,
              )
            }
            className="input w-full p-2 border rounded"
          />
        </div>

        <div className="flex flex-col gap-1 w-1/2">
          <label className="text-primary-500">미션 시작 시간</label>
          <input
            type="time"
            value={missionStartAt.split('T')[1]?.slice(0, 5) || ''}
            onChange={(e) =>
              setMissionStartAt(
                `${missionStartAt.split('T')[0] || '2024-01-01'}T${e.target.value}`,
              )
            }
            className="input w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="flex gap-4 w-full mt-0">
        <div className="flex flex-col gap-1 w-1/2">
          <label className="text-primary-500">미션 종료 날짜</label>
          <input
            type="date"
            value={missionEndAt.split('T')[0]}
            onChange={(e) =>
              setMissionEndAt(
                `${e.target.value}T${missionEndAt.split('T')[1] || '00:00'}`,
              )
            }
            className="input w-full p-2 border rounded"
          />
        </div>

        <div className="flex flex-col gap-1 w-1/2">
          <label className="text-primary-500">미션 종료 시간</label>
          <input
            type="time"
            value={missionEndAt.split('T')[1]?.slice(0, 5) || ''}
            onChange={(e) =>
              setMissionEndAt(
                `${missionEndAt.split('T')[0] || '2024-01-01'}T${e.target.value}`,
              )
            }
            className="input w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="!text-left w-full">
        <Typography
          size="md"
          weight="medium"
          classNameStyles="text-primary-400"
        >
          난이도 선택
        </Typography>
      </div>
      <div className="flex flex-col gap-3 mb-20 !text-left w-full mt-12">
        <NumberDial
          min={1}
          max={3}
          defaultNumber={difficulty}
          labels={['하', '중', '상']}
          onChangeNumber={setDifficulty}
        />
      </div>

      <Button
        onClick={handleMissionUpdate}
        classNameStyles={`${bigButtonStyles()}`}
      >
        수정하기
      </Button>
    </div>
  );
};

const bigButtonStyles = tv({
  base: '!bg-primary-400 hover:!bg-primary-300 active:!bg-primary-300 !rounded-3xl !w-full !px-4 !z-10 !py-8 font-bold !text-2xl mt-4',
});

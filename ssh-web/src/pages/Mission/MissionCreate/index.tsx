import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  useMutation,
  useQuery,
  UseMutationOptions,
} from '@tanstack/react-query';
import { Typography } from '../../../components/atoms/Typography';
import { Button } from '../../../components/atoms/Button';
import { resizeState } from '../../../atoms/resize';
import { isModalOpenState } from '../../../atoms/modal';
import { IMissionCreateRequest } from '../../../interfaces/missionInterface';
import { AxiosResponse, AxiosError } from 'axios';
import { missionCreateStyles } from './MissionCreate.styles';
import { createMission } from '../../../apis/missionApi';
import { getMyChildren } from '../../../apis/userApi';
import { tv } from 'tailwind-variants';
import TextField from '../../../components/atoms/TextField';
import { NumberDial } from '../../../components/molecules/NumberDial';

export const MissionCreate: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState('');
  const [missionDescription, setMissionDescription] = useState('');
  const [difficulty, setDifficulty] = useState(2);
  const [missionStartAt, setMissionStartAt] = useState('');
  const [missionEndAt, setMissionEndAt] = useState('');
  const setModalState = useSetRecoilState(isModalOpenState);
  const size = useRecoilValue(resizeState);

  const { data: children, isLoading: isChildrenLoading } = useQuery({
    queryKey: ['myChildren'],
    queryFn: async () => {
      const response = await getMyChildren();
      return response.data;
    },
  });

  useEffect(() => {
    const now = new Date();
    const nextHour = new Date(now.getTime() + 3600000);

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const formatTime = (date: Date) => {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    setMissionStartAt(`${formatDate(now)}T${formatTime(now)}`);
    setMissionEndAt(`${formatDate(nextHour)}T${formatTime(nextHour)}`);
  }, []);

  const mutationOptions: UseMutationOptions<
    AxiosResponse<IMissionCreateRequest>,
    AxiosError,
    IMissionCreateRequest
  > = {
    onSuccess: () => {
      setModalState({
        isOpen: true,
        content: (
          <Typography size="lg">미션이 성공적으로 등록되었습니다!</Typography>
        ),
      });
    },
    onError: (error) => {
      setModalState({
        isOpen: true,
        content: (
          <Typography size="lg">
            미션 등록에 실패했습니다. 다시 시도해 주세요.
          </Typography>
        ),
      });
      console.error('Mission registration failed:', error);
    },
  };

  const missionMutation = useMutation({
    mutationFn: createMission,
    ...mutationOptions,
  });

  const handleMissionSubmit = () => {
    if (!selectedChild) {
      setModalState({
        isOpen: true,
        content: <Typography size="lg">도전자를 선택해 주세요.</Typography>,
      });
      return;
    }

    const missionData: IMissionCreateRequest = {
      nickname: selectedChild,
      description: missionDescription,
      missionStartAt: missionStartAt,
      missionEndAt: missionEndAt,
      missionLevel: difficulty.toString() as '1' | '2' | '3',
    };

    missionMutation.mutate(missionData);
  };

  return (
    <div className={missionCreateStyles({ size })}>
      <div className="text-left w-full flex flex-col">
        <Typography size="2xl" weight="bold">
          쏠쏠한 미션 등록
        </Typography>
      </div>

      <div className="w-full">
        {isChildrenLoading ? (
          <Typography size="lg">도전자 목록을 불러오는 중입니다...</Typography>
        ) : (
          <div className="mb-4">
            <label className="text-primary-500">도전자</label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="input w-full p-2 border rounded"
            >
              <option value="">도전자를 선택해 주세요</option>
              {children?.map((child) => (
                <option key={child.nickname} value={child.nickname}>
                  {child.name} ({child.nickname})
                </option>
              ))}
            </select>
          </div>
        )}

        <TextField
          label="쏠쏠한 미션 설명"
          fullWidth
          size="sm"
          defaultValue={missionDescription}
          onChange={(e) => setMissionDescription(e.target.value)}
          classNameStyles="!mb-0"
        />
      </div>

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
        onClick={handleMissionSubmit}
        classNameStyles={`${bigButtonStyles()}`}
      >
        등록하기
      </Button>
    </div>
  );
};

const bigButtonStyles = tv({
  base: '!bg-primary-400 hover:!bg-primary-300 active:!bg-primary-300 !rounded-3xl !w-full !px-4 !z-10 !py-8 font-bold !text-2xl mt-4',
});

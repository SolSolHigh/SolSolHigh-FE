import React from 'react';
import { MascotCardProps } from './MascotCard.types';
import { CircularImage } from '../../atoms/CircularImage';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';
import { HiTrash } from 'react-icons/hi2';
import dayjs from 'dayjs';
import { getImgSrc } from '../../../utils/userUtil';
import { deleteMyChild, deleteMyWaitingChild } from '../../../apis/userApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const MascotCard = ({
  childInfo,
  isWaiting = false,
  children,
  classNameStyles,
}: MascotCardProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (nickname: string) =>
      !isWaiting
        ? await deleteMyChild(nickname)
        : await deleteMyWaitingChild(nickname),
    onSuccess: (res) => {
      alert(res.data.description);
      queryClient.invalidateQueries({ queryKey: ['children', 'waiting'] });
    },
    onError: (err) => alert(err.message),
  });

  return (
    <div className="relative flex items-center w-full p-4 rounded-md shadow-sm">
      <CircularImage
        imageUrl={getImgSrc(childInfo.gender, 'CHILD')}
        altText="boy1"
        size="xl"
      />
      <div className="flex flex-col justify-between ml-4 gap-y-2">
        <div className="flex items-center">
          <Typography color="dark" size="sm">
            {childInfo.name}
          </Typography>
        </div>
        <div className="flex items-center">
          <Typography color="dark" size="sm">
            {childInfo.nickname}
          </Typography>
        </div>
        <div className="flex items-center">
          <Typography color="dark" size="sm">
            {dayjs(childInfo.birthday).format('YYYY년 MM월 DD일')}
          </Typography>
        </div>
      </div>
      <Icon
        color="danger"
        classNameStyles="absolute right-4 top-4 mob:right-2 mob:top-2"
      >
        <HiTrash onClick={() => mutate(childInfo.nickname)} />
      </Icon>
    </div>
  );
};

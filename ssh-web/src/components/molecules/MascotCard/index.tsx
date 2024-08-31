import React from 'react';
import { MascotCardProps } from './MascotCard.types';
import { CircularImage } from '../../atoms/CircularImage';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';
import { HiTrash } from 'react-icons/hi2';
import dayjs from 'dayjs';
import {
  deleteMyChild,
  deleteMyWaitingChild,
  refuseRequest,
} from '../../../apis/userApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getImgSrc } from '../../../utils/userUtil';
import { showToast } from '../../../utils/toastUtil';
import { IChild, IRequest } from '../../../interfaces/userInterface';

export const MascotCard = ({
  info,
  type,
  isWaiting = false,
  withTrash = true,
  children,
  classNameStyles,
}: MascotCardProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () =>
      type === 'CHILD' &&
      (!isWaiting
        ? await deleteMyChild((info as IChild).nickname)
        : await deleteMyWaitingChild((info as IRequest).requestId)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['children', 'waiting'],
      });
    },
    onError: (err) => alert(err.message),
  });

  return (
    <div className="relative flex items-center w-full p-4 rounded-md shadow-sm">
      <CircularImage
        imageUrl={getImgSrc(info.gender, type)}
        altText={info.name}
        size="xl"
      />
      <div className="flex flex-col justify-between ml-4 gap-y-2">
        <div className="flex items-center">
          <Typography color="dark" size="sm">
            {info.name}
          </Typography>
        </div>
        <div className="flex items-center">
          <Typography color="dark" size="sm">
            {info.nickname}
          </Typography>
        </div>
        <div className="flex items-center">
          <Typography color="dark" size="sm">
            {dayjs(info.birthday).format('YYYY년 MM월 DD일')}
          </Typography>
        </div>
      </div>
      {type === 'CHILD' && withTrash && (
        <Icon
          color="danger"
          classNameStyles="absolute right-4 top-4 mob:right-2 mob:top-2"
        >
          <HiTrash onClick={() => mutate()} />
        </Icon>
      )}
      {type === 'PARENT' && withTrash && isWaiting && (
        <Icon
          color="danger"
          classNameStyles="absolute right-4 top-4 mob:right-2 mob:top-2"
        >
          <HiTrash onClick={() => mutate()} />
        </Icon>
      )}
    </div>
  );
};

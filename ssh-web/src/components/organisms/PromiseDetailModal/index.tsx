import React from 'react';
import dayjs from 'dayjs';
import { IPromiseLogs } from '../../../interfaces/promiseTicketInterface';
import { Button } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { PromiseDetailModalProps } from './PromiseDetailModal.types';
import stemp from '../../molecules/PromiseItem/stemp.png';
import { stempStyles } from './PromiseDetailModal.styles';
import { EResize } from '../../../themes/themeBase';
import { resizeState } from '../../../atoms/resize';
import { useRecoilValue } from 'recoil';
import defaultImg from './promiseImg.png';
import { close } from 'inspector';

export const PromiseDetailModal = ({
  log,
  isParent,
  closeModal,
}: PromiseDetailModalProps) => {
  const isConfirm = log?.usedAt;
  const size = useRecoilValue<EResize>(resizeState);

  // 날짜 변환
  const formattedDate = isConfirm
    ? dayjs(log.usedAt).format('YYYY년 MM월 DD일')
    : null;

  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col items-center align-middle w-full max-w-[24rem] relative">
        <img
          src={isConfirm ? log.imageUrl : defaultImg}
          className="rounded-2xl shadow-lg w-[90%] max-w-[24rem]"
        />
        {isConfirm && <img src={stemp} className={stempStyles({ size })} />}
        <Typography
          color="dark"
          size="4xl"
          weight="bold"
          classNameStyles="text-center mt-2"
        >
          약속
        </Typography>
        {formattedDate && (
          <Typography
            size="lg"
            color="secondary"
            weight="semibold"
            classNameStyles="my-1 text-center"
          >
            {formattedDate}
          </Typography>
        )}
        <Typography
          size="2xl"
          color="primary"
          weight="semibold"
          classNameStyles="my-4 text-center"
        >
          {log?.description}
        </Typography>
        {!isParent && !isConfirm && (
          <Typography color="secondary" classNameStyles="my-2">
            부모님의 약속을 기다리고있어요
          </Typography>
        )}

        {!isParent && isConfirm && (
          <Typography color="secondary" classNameStyles="mb-2">
            부모님이 약속을 지켜주셨어요!
          </Typography>
        )}
        <Button fullWidth={true} onClick={closeModal}>
          확인
        </Button>
      </div>
    </div>
  );
};

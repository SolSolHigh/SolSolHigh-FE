import React from 'react';
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

export const PromiseDetailModal = ({
  log,
  isParent,
}: PromiseDetailModalProps) => {
  const isConfirm = log?.usedAt;
  const size = useRecoilValue<EResize>(resizeState);

  return (
    <div className="w-[100%] h-[100%] flex justify-center">
      <div className="flex flex-col items-center align-middle w-[100%] max-w-[24rem] relative">
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
        <Typography
          size="2xl"
          color="primary"
          weight="semibold"
          classNameStyles="mt-4 text-center"
        >
          {log?.description}
        </Typography>
        {!isParent && !isConfirm && (
          <Typography color="secondary" classNameStyles="my-2">
            부모님의 약속을 기다리고있어요
          </Typography>
        )}
        <Button fullWidth={true}>확인</Button>
      </div>
    </div>
  );
};

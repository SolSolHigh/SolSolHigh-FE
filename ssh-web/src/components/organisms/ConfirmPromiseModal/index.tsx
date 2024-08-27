import React from 'react';
import { IPromiseLogs } from '../../../interfaces/promiseTicketInterface';
import { Button } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import stemp from '../../molecules/PromiseItem/stemp.png';
import { EResize } from '../../../themes/themeBase';
import { resizeState } from '../../../atoms/resize';
import { useRecoilValue } from 'recoil';
import defaultImg from './promiseImg.png';
import { ConfirmPromiseModalProps } from './ConfirmPromiseModal.types';

export const ConfirmPromiseModal = ({
  log,
  isParent,
}: ConfirmPromiseModalProps) => {
  const isConfirm = log?.usedAt;
  const size = useRecoilValue<EResize>(resizeState);

  return (
    <div className="w-[100%] h-[100%] flex justify-center">
      <div className="flex flex-col items-center align-middle w-[100%] max-w-[24rem] relative">
        <input type="file"></input>
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
        <Button fullWidth={true}>확인</Button>
      </div>
    </div>
  );
};

import React from 'react';
import { Button } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { AddPromiseModalProps } from './AddPromiseModal.types';

export const AddPromiseModal = ({
  countTicket,
  onUpload,
}: AddPromiseModalProps) => {
  if (countTicket === 0) {
    return (
      <div className="flex flex-col align-middle text-center py-4">
        <Typography
          color="dark"
          size="2xl"
          weight="bold"
          classNameStyles="my-4"
        >
          보유한 약속권이 없어요!
        </Typography>
        <Button fullWidth={true} onClick={onUpload} classNameStyles="my-4">
          확인
        </Button>
      </div>
    );
  }

  return (
    <div className="w-[100%] h-[100%] flex justify-center">
      <div className="flex flex-col items-center align-middle w-[100%] max-w-[24rem]">
        <img
          src={process.env.PUBLIC_URL + 'assets/images/common/promiseImg.png'}
          className="rounded-2xl shadow-lg w-[90%] max-w-[24rem]"
        />
        <Typography
          color="dark"
          size="4xl"
          weight="bold"
          classNameStyles="text-center mt-2"
        >
          약속
        </Typography>
        <textarea className="rounded-lg mt-2 w-[100%] h-[6rem] shadow-lg border-secondary-800 p-2 resize-none"></textarea>
        <Typography
          size="2xl"
          color="dark"
          weight="semibold"
          classNameStyles="text-center mt-4"
        >
          하기를 부모님과{' '}
          <Typography
            size="2xl"
            color="primary"
            weight="semibold"
            classNameStyles="text-center inline"
          >
            약속
          </Typography>
          해요
        </Typography>
        <Button
          color="primary"
          size="md"
          fullWidth={true}
          classNameStyles="mt-4"
          onClick={onUpload}
        >
          <Typography color="light" weight="bold" size="xl">
            약속하기
          </Typography>
        </Button>
      </div>
    </div>
  );
};

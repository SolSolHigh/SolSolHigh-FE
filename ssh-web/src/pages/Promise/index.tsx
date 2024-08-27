import React from 'react';
import { containerStyles, contentStyles, layoutStyles } from './styles';
import { EResize } from '../../themes/themeBase';
import { resizeState } from '../../atoms/resize';
import { useRecoilValue } from 'recoil';
import { Typography } from '../../components/atoms/Typography';

export const PromiseTicket = () => {
  const size = useRecoilValue<EResize>(resizeState);

  return (
    <div className={layoutStyles({ size })}>
      <div className={containerStyles({ size })}>
        <div className={contentStyles({ size })}>
          <Typography weight="bold" color="dark" size="lg">
            보유한 약속권
          </Typography>
          <div className="flex items-center space-x-2">
            <Typography color="dark" classNameStyles="mr-8">
              1
            </Typography>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <Typography size="xs" weight="semibold">
                TICKET
              </Typography>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <AddPromise />
          <PromiseItem />
        </div>
      </div>
    </div>
  );
};

const AddPromise = () => {
  return (
    <div className="flex justify-center cursor-pointer">
      <div className="flex flex-col p-4 bg-primary-100 items-center w-32 h-48 rounded-lg shadow-md">
        <div className="w-24 h-24 bg-secondary-300 rounded-lg flex items-center justify-center">
          <span className="text-lg text-gray-500">+</span>
        </div>
        <div className="text-center">
          <Typography color="dark" size="sm">
            약속 요청하기
          </Typography>
        </div>
      </div>
    </div>
  );
};

const PromiseItem = () => {
  return (
    <div className="flex justify-center cursor-pointer">
      <div className="flex flex-col p-4 bg-primary-100 items-center w-32 h-48 rounded-lg shadow-md">
        <div className="w-24 h-24 rounded-lg bg-cover bg-center">
          <img
            src="https://media1.tenor.com/m/imFIc3R5UY8AAAAC/pepe-pepe-wink.gif"
            className="w-full h-full bg-red-600 bg-opacity-50 flex items-center justify-center rounded-lg"
          />
        </div>
        <Typography color="dark" size="sm">
          햄스터 키우기
        </Typography>
      </div>
    </div>
  );
};

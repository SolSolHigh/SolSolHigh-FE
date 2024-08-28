import React from 'react';
import { LevelCardProps } from './LevelCard.types';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';
import {
  HiOutlineBanknotes,
  HiOutlineCheckCircle,
  HiOutlinePuzzlePiece,
  HiPaperAirplane,
} from 'react-icons/hi2';

export const LevelCard = ({ children, classNameStyles }: LevelCardProps) => {
  return (
    <div className="w-full max-w-[30rem] p-4 flex flex-col justify-between bg-primary-500 gap-y-4 rounded-lg">
      {/* 레벨 & 버튼 영역 */}
      <div className="flex justify-between w-full">
        {/* 레벨 */}
        <div>
          <Typography
            weight="bold"
            size="xs"
            classNameStyles="text-secondary-300"
          >
            현재 레벨
          </Typography>
          <Typography
            weight="bold"
            size="lg"
            color="light"
            classNameStyles="mt-1"
          >
            Lv. 17
          </Typography>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col gap-y-1">
          <Typography
            weight="bold"
            size="xs"
            classNameStyles="text-secondary-300"
          >
            경험치 얻으러 가기
          </Typography>
          <div className="flex gap-x-2">
            <div className="flex items-center justify-center bg-white rounded-full w-7 h-7">
              <Icon size="sm">
                <HiOutlineBanknotes />
              </Icon>
            </div>
            <div className="flex items-center justify-center bg-white rounded-full w-7 h-7">
              <Icon size="sm">
                <HiOutlineCheckCircle />
              </Icon>
            </div>
            <div className="flex items-center justify-center bg-white rounded-full w-7 h-7">
              <Icon size="sm">
                <HiOutlinePuzzlePiece />
              </Icon>
            </div>
          </div>
        </div>
      </div>

      {/* 경험치 */}
      <div className="relative flex flex-col w-full gap-y-1">
        {/* 진행률 아이콘 */}
        <div className="w-full h-fit pl-[67%]">
          <div className="flex flex-col items-center w-fit">
            <Typography color="light" weight="semibold" size="2xs">
              70%
            </Typography>
            <Icon color="light" classNameStyles="animate-floating">
              <HiPaperAirplane />
            </Icon>
          </div>
        </div>

        {/* 진행바 */}
        <div className="relative w-full h-2 bg-white rounded-full">
          <div className="absolute h-2 left-0 top-0 rounded-full bg-warning-500 w-[70%]"></div>
        </div>

        {/* 0~100% */}
        <div className="flex justify-between w-full">
          <Typography color="light" weight="bold" size="xs">
            0%
          </Typography>
          <Typography color="light" weight="bold" size="xs">
            100%
          </Typography>
        </div>
      </div>
    </div>
  );
};

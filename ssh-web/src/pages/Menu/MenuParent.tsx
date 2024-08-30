import React from 'react';
import { IUserInfo } from '../../interfaces/userInterface';
import { Mascot } from '../../components/molecules/Mascot';
import { CircularImage } from '../../components/atoms/CircularImage';
import { getImgSrc } from '../../utils/userUtil';
import { Typography } from '../../components/atoms/Typography';
import { Icon } from '../../components/atoms/Icon';
import {
  HiOutlineBanknotes,
  HiOutlineGift,
  HiOutlinePaperAirplane,
  HiOutlineUserGroup,
} from 'react-icons/hi2';

export interface MenuParentProps {
  parent: IUserInfo;
}

export const MenuParent = ({ parent }: MenuParentProps) => {
  return (
    <div className="flex items-center justify-center w-full h-auto tablet:flex-col">
      <Mascot nickname={parent.nickname} ment="무엇이 궁금하신가요?" />
      <div className="flex flex-col items-center desktop:w-[48rem] desktop:h-[48rem] desktop:rounded-lg desktop:py-16 tablet:w-full tablet:h-full tablet:rounded-t-3xl tablet:py-8 bg-[#f7f7f7]">
        <CircularImage
          imageUrl={getImgSrc(parent.gender, 'PARENT')}
          altText={parent.nickname}
          size="xl"
        />
        {/* 메이저 버튼 영역 */}
        <div className="flex items-center w-full py-4 mt-4 bg-white justify-evenly">
          <div className="flex flex-col items-center gap-y-2">
            <img
              src="/assets/images/experience/send-money.png"
              className="w-10 h-10"
            />
            <Typography color="dark" size="xs">
              송금하기
            </Typography>
          </div>
          <div className="flex flex-col items-center gap-y-2">
            <img
              src="/assets/images/experience/bank-check.png"
              className="w-10 h-10"
            />
            <Typography color="dark" size="xs">
              내 자녀의 퀴즈
            </Typography>
          </div>
        </div>

        {/* 통장 */}
        <div className="flex w-full py-4 mt-4 bg-white tablet:px-8">
          <div className="w-full max-w-[30rem] flex flex-col mx-auto gap-y-4">
            <Typography color="dark" weight="bold" size="xs">
              통장
            </Typography>
            <div className="flex items-center gap-x-4">
              <Icon size="xs">
                <HiOutlinePaperAirplane />
              </Icon>
              <Typography color="dark" size="xs">
                송금하기
              </Typography>
            </div>
            <div className="flex items-center gap-x-4">
              <Icon size="xs">
                <HiOutlineBanknotes />
              </Icon>
              <Typography color="dark" size="xs">
                내 통장 보러가기
              </Typography>
            </div>
            <div className="flex items-center gap-x-4">
              <Icon size="xs">
                <HiOutlineBanknotes />
              </Icon>
              <Typography color="dark" size="xs">
                내 자녀 통장 보러가기
              </Typography>
            </div>
            <div className="flex items-center gap-x-4">
              <Icon size="xs">
                <HiOutlineBanknotes />
              </Icon>
              <Typography color="dark" size="xs">
                통장 개설하기
              </Typography>
            </div>
          </div>
        </div>

        {/* 약속권 */}
        <div className="flex w-full py-4 mt-4 bg-white tablet:px-8">
          <div className="w-full max-w-[30rem] flex flex-col mx-auto gap-y-4">
            <Typography color="dark" weight="bold" size="xs">
              약속권
            </Typography>
            <div className="flex items-center gap-x-4">
              <Icon size="xs">
                <HiOutlineGift />
              </Icon>
              <Typography color="dark" size="xs">
                약속권 보러가기
              </Typography>
            </div>
          </div>
        </div>

        {/* 가족 */}
        <div className="flex w-full py-4 mt-4 bg-white tablet:px-8">
          <div className="w-full max-w-[30rem] flex flex-col mx-auto gap-y-4">
            <Typography color="dark" weight="bold" size="xs">
              가족
            </Typography>
            <div className="flex items-center gap-x-4">
              <Icon size="xs">
                <HiOutlineUserGroup />
              </Icon>
              <Typography color="dark" size="xs">
                가족 보러가기
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

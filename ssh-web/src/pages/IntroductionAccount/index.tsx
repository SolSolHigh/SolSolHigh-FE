import React from 'react';
import { Mascot } from '../../components/molecules/Mascot';
import { Typography } from '../../components/atoms/Typography';
import Img from './family.png';
import { Button } from '../../components/atoms/Button';

export const IntroductionAccountPage = () => {
  //todo
  const isParent = true;

  return (
    <div className="flex items-center justify-center w-full h-auto tabletB:flex-col">
      <Mascot
        nickname="닉네임"
        ment="자신의 계좌를 확인해보세요!"
        classNameStyles={'tablet:hidden'}
      />
      <div className="bg-white flex flex-col items-center w-full mob:h-full mob:p-4 tablet:h-full tablet:p-6 desktop:rounded-2xl desktop:px-4 desktop:max-w-[48rem] desktop:h-[48rem]">
        <div className="flex flex-col w-full h-[80%] content-around tabletB:max-w-[48rem]">
          <Typography
            size="6xl"
            weight="bold"
            color="dark"
            classNameStyles="mb-2"
          >
            서비스 안내
          </Typography>
          <div className="w-full h-full  bg-primary-200 p-8 rounded-xl">
            <Typography
              size="6xl"
              color="primary"
              weight="semibold"
              classNameStyles=" text-center leading-[3rem]"
            >
              {isParent
                ? 'SolSol-High 자녀 계좌 관리 서비스를 이용하기 위해서는 수시입출금 계좌 개설이 필요해요'
                : '해당 서비스는 자신의 용돈통장이 필요해요! 부모님에게 말씀드려 같이 만들어봐요!'}
            </Typography>
            <div className="flex justify-center">
              <img src={Img}></img>
            </div>
          </div>
          <div className="flex justify-center align mt-8">
            {isParent ? (
              <Button size="lg" fullWidth={true} classNameStyles="m-4">
                계좌 개설하기
              </Button>
            ) : (
              <Button size="lg" fullWidth={true} classNameStyles="m-4">
                부모님에게 요청하기
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

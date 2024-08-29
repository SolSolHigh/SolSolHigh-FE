import React from 'react';
import { Mascot } from '../../components/molecules/Mascot';
import { contentStyles } from './styles';
import { LevelCard } from '../../components/molecules/LevelCard';
import { Typography } from '../../components/atoms/Typography';
import { TypographyWithBox } from '../../components/atoms/TypographyWithBox';
import { IUserInfo } from '../../interfaces/userInterface';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getExperience } from '../../apis/experienceApi';

export interface HomeChildProps {
  child: IUserInfo;
}

export const HomeChild = ({ child }: HomeChildProps) => {
  const experienceQuery = useSuspenseQuery({
    queryKey: ['experience'],
    queryFn: async () => await getExperience(),
  });

  return (
    <div className="flex items-center justify-center w-full h-auto tablet:flex-col">
      <Mascot
        nickname={child.nickname}
        ment="반가워요!"
        classNameStyles="tablet:hidden"
      />
      <div className={contentStyles()}>
        <LevelCard info={experienceQuery.data!.data} />
        <div className="relative mt-8 w-60 h-60">
          <img
            src={experienceQuery.data?.data.assets}
            className="w-full h-full bg-gradient-E"
          />
        </div>
        <div className="flex flex-col items-center mt-8 gap-y-2">
          <div className="flex flex-col items-center gap-y-1">
            <Typography weight="semibold" size="sm" color="secondary">
              현재 잔액
            </Typography>
            <Typography weight="bold" color="dark">
              사용할 수 있는 금액이
            </Typography>
          </div>
          <div className="flex items-center gap-x-1">
            {'386,400원'.split('').map((number: string, idx: number) => {
              return (
                <TypographyWithBox
                  key={idx}
                  number={number}
                  withBox={'0' <= number && number <= '9'}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

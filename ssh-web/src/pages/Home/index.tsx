import React from 'react';
import { Mascot } from '../../components/molecules/Mascot';
import { contentStyles } from './styles';
import { LevelCard } from '../../components/molecules/LevelCard';
import { Typography } from '../../components/atoms/Typography';
import { TypographyWithBox } from '../../components/atoms/TypographyWithBox';

export const Home = () => {
  return (
    <div className="flex items-center justify-center w-full h-auto tablet:flex-col">
      <Mascot
        nickname="닉네임"
        ment="반가워요! 몇 가지만 더 물어볼게요"
        classNameStyles="tablet:hidden"
      />
      <div className={contentStyles()}>
        <LevelCard />
        <div className="relative mt-8 w-60 h-60">
          <img src="/assets/E.png" className="w-full h-full bg-gradient-E" />
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

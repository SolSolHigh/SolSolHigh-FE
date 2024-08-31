import React, { useState, useEffect, useMemo } from 'react';
import { Typography } from '../../../components/atoms/Typography';
import { useNavigate } from 'react-router-dom';
import { PathNames } from '../../../utils/router';
import { QuizTabProps } from './QuizTabProps.types';
import { Button } from '../../atoms/Button';

import { Skeleton } from '../../atoms/Skeleton';
import dayjs from 'dayjs';

export const QuizTab: React.FC<QuizTabProps> = ({
  size,
  isTodayQuiz,
  childNickname,
  loading,
  isParent,
  setLoading,
  strick,
}) => {
  const navigate = useNavigate();
  const today = new Date();

  return (
    <div className="space-y-8 w-full max-w-[48rem]">
      <div className="grid grid-cols-3 bg-primary-100 p-6 rounded-lg mt-8 shadow-md w-full">
        <div className="col-span-2 text-center">
          <Typography color="secondary" weight="semibold">
            {dayjs(today).format('YYYY년 M월 D일')}
          </Typography>
          <Typography
            weight="semibold"
            className="flex justify-center w-full"
            classNameStyles="mt-2"
          >
            {loading ? (
              <Skeleton width={'95%'} />
            ) : isTodayQuiz ? (
              '오늘은 퀴즈를 풀었어요!'
            ) : (
              '오늘은 아직 퀴즈를 풀지 않았어요'
            )}
          </Typography>

          <div className="flex items-center mt-4">
            <Button
              fullWidth={true}
              onClick={() => {
                navigate(PathNames.QUIZ.path + '/solve');
              }}
              classNameStyles="mr-4"
              disabled={isTodayQuiz || loading || isParent}
            >
              풀러가기
            </Button>
          </div>
        </div>
        <div className="col-span-1 border-l flex justify-center items-center">
          <img
            src={`/assets/mascot_study.png`}
            alt="Mascot"
            className="w-24 h-24 border"
          />
        </div>
      </div>

      <div className="bg-primary-100 p-6 rounded-lg shadow-md">
        <Typography weight="bold" classNameStyles="mb-6 text-center">
          일주일을 모두 채우면 약속권을 받아요!
        </Typography>
        <div className="flex justify-around mb-2 bg-primary-200 p-4 rounded-md">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${index < strick.length ? 'bg-primary-500 text-white' : 'bg-secondary-100 text-gray-600'}`}
            >
              {index === 6 ? '🏆' : index + 1 + '일'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

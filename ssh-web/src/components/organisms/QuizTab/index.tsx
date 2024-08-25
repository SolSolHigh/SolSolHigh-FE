import React from 'react';
import { Typography } from '../../../components/atoms/Typography';
import { useNavigate } from 'react-router-dom';
import { PathNames } from '../../../utils/router';
import { QuizTabProps } from './QuizTabProps.types';
import { Button } from '../../atoms/Button';

export const QuizTab: React.FC<QuizTabProps> = ({
  size,
  isTodayQuiz,
  loading,
}) => {
  const navigate = useNavigate();
  const today = new Date();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 bg-white p-4 rounded-lg">
        <div className="col-span-2 text-center">
          <Typography color="secondary" weight="regular">
            {today.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </Typography>
          <Typography>
            {isTodayQuiz
              ? '오늘은 퀴즈를 풀었어요!'
              : '오늘은 아직 퀴즈를 풀지 않았어요'}
          </Typography>

          <div className="flex items-center mt-4">
            <Button
              fullWidth={true}
              onClick={() => {
                navigate(PathNames.QUIZ.path + '/solve');
              }}
              classNameStyles="mr-4"
              disabled={isTodayQuiz || loading}
            >
              풀러가기
            </Button>
          </div>
        </div>
        <div className="col-span-1 border-l flex justify-center items-center">
          <img
            src="https://media1.tenor.com/m/1fx68zKvE14AAAAC/thumbs-up-double-thumbs-up.gif"
            alt="Mascot"
            className="w-24 h-24 border"
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <Typography weight="bold" classNameStyles="mb-6 text-center">
          일주일을 모두 채우면 약속권을 받아요!
        </Typography>
        <div className="flex justify-around mb-2">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${index < 4 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              {index + 1}일
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

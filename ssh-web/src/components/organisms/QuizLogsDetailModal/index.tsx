import React from 'react';
import { Button } from '../../atoms/Button';
import { Typography } from '../../../components/atoms/Typography';
import dayjs from 'dayjs';
import { QuizDetail } from '../../molecules/QuizDetail';
import { QuizLogsDetailModalProps } from './QuizLogsDetailModal.types';

export const QuizLogsDetailModal: React.FC<QuizLogsDetailModalProps> = ({
  quizLogs,
  openQuizId,
  toggleQuizDetail,
}) => {
  return (
    <div className="overflow-auto w-full self-start">
      {quizLogs.map((item) => (
        <React.Fragment key={item.quizId}>
          <div className="flex justify-between rounded-lg p-2 bg-primary-100">
            <Typography
              size="xl"
              weight="semibold"
              classNameStyles="flex h-full"
            >
              {dayjs(item.correctedAt).format('YYYY년 M월 D일')}
            </Typography>
            <Typography
              size="md"
              weight="semibold"
              classNameStyles={
                'rounded-full p-3 px-4 ' +
                (item.isCorrect ? `bg-primary-400` : `bg-danger-400`)
              }
              color="light"
            >
              {item.isCorrect ? '맞았어요!!! ' : '틀렸어요...'}
            </Typography>
            <Button
              size="md"
              classNameStyles="rounded-2xl"
              onClick={() => toggleQuizDetail(item.quizId)}
            >
              퀴즈보기
            </Button>
          </div>
          {openQuizId === item.quizId && (
            <div
              className={`mt-4 transform transition-all duration-300 ease-in-out origin-top ${
                openQuizId === item.quizId
                  ? 'scale-y-100 opacity-100'
                  : 'scale-y-0 opacity-0'
              }`}
            >
              <QuizDetail
                key={item.quizId}
                description={item.description}
                keyword={item.keyword}
                quizId={item.quizId}
              >
                <Typography color="secondary" classNameStyles="text-center">
                  {item.quizExplanation}
                </Typography>
              </QuizDetail>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

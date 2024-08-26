import React from 'react';
import { IQuizLogResponseList } from '../../../interfaces/quizInterface';
import { Button } from '../../atoms/Button';
import { Typography } from '../../../components/atoms/Typography';
import dayjs from 'dayjs';
import { QuizDetail } from '../../molecules/QuizDetail';

interface QuizLogsDetailModalProps {
  quizLogs: IQuizLogResponseList;
  openQuizId: number;
  toggleQuizDetail: (id: number) => void;
}

export const QuizLogsDetailModal: React.FC<QuizLogsDetailModalProps> = ({
  quizLogs,
  openQuizId,
  toggleQuizDetail,
}) => {
  return (
    <div className="overflow-auto">
      {quizLogs.map((item) => (
        <React.Fragment key={item.quizId}>
          <div className="flex justify-between border-red-100 rounded-lg p-4">
            <Typography
              size="xl"
              weight="semibold"
              classNameStyles="vertical-middle"
            >
              {dayjs(item.correctedAt).format('YYYY년 M월 D일')}
            </Typography>
            <Typography
              size="2xl"
              weight="regular"
              color={item.isCorrect ? 'primary' : 'danger'}
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
            <div className="mt-4">
              <QuizDetail
                key={item.quizId}
                description={item.description}
                keyword={item.keyword}
                quizId={item.quizId}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

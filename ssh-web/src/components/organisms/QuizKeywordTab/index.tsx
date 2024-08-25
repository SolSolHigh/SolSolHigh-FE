import React, { useState } from 'react';
import { Typography } from '../../../components/atoms/Typography';
import { KeywordsProps } from './QuizKeywordTab.types';

export const KeywordsTab: React.FC<KeywordsProps> = ({ size, quizLogs }) => (
  <div className="space-y-4">
    <div className="bg-white p-4 rounded-lg">
      <Typography
        size="xl"
        weight="semibold"
        color="dark"
        classNameStyles="mb-4"
      >
        퀴즈 키워드
      </Typography>
      <div className="flex gap-2">
        {['은행', '통장', '이자', '저축'].map((keyword, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            {keyword}
          </button>
        ))}
      </div>
    </div>

    <div className="bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg">퀴즈 내역</div>
        <button className="text-blue-500">모두 보기</button>
      </div>
      <div className="space-y-2">
        {quizLogs.map((history, index) => (
          <div key={index} className="flex justify-between text-gray-600">
            {history.correctedAt}
            <span
              className={history.isCorrect ? 'text-blue-500' : 'text-red-500'}
            >
              {history.isCorrect ? '맞았어요!' : '틀렸어요...'}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

import React, { useState } from 'react';
import { HiOutlinePencil } from 'react-icons/hi';
import { Typography } from '../../../components/atoms/Typography';
import { Icon } from '../../atoms/Icon';
import { KeywordsProps } from './QuizKeywordTab.types';
import { IKeywordResponseList } from '../../../interfaces/quizInterface';
import { Button } from '../../atoms/Button';
import dayjs from 'dayjs';

export const KeywordsTab: React.FC<KeywordsProps> = ({
  size,
  quizLogs = [],
  childNickname,
  setLoading,
  isParent,
  keywords,
  ownKeywords,
  openKeywordModal,
  openQuizLogsModal,
}) => {
  return (
    <>
      <div className="space-y-4">
        <div className="bg-primary-100 p-6 rounded-lg">
          <Typography
            size="xl"
            weight="semibold"
            color="dark"
            classNameStyles="mb-4 flex justify-between"
          >
            퀴즈 키워드
            {isParent && (
              <div onClick={openKeywordModal}>
                <Icon color="dark">{<HiOutlinePencil />}</Icon>
              </div>
            )}
          </Typography>
          <div className="flex gap-2">
            {ownKeywords.map((keyword) => (
              <Button key={keyword.keywordId}>
                <Typography color="light" size="sm">
                  {keyword.keyword}
                </Typography>
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-primary-100 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <Typography size="xl" weight="semibold" color="dark">
              퀴즈 내역
            </Typography>
            <button
              className="text-secondary-500 underline"
              onClick={openQuizLogsModal}
            >
              모두 보기
            </button>
          </div>
          <div className="space-y-2">
            {quizLogs &&
              quizLogs.slice(0, 8).map((history, index) => (
                <div
                  key={index}
                  className="flex justify-between text-secondary-600"
                >
                  {dayjs(history.correctedAt).format('YYYY년 M월 D일')}
                  <Typography color={history.isCorrect ? 'primary' : 'danger'}>
                    {history.isCorrect ? '맞았어요!!! ' : '틀렸어요...'}
                  </Typography>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const KeywordEditModal = ({
  keywords,
  ownKeywords,
  onRemoveKeyword,
  onAddKeyword,
  onClose,
}: {
  keywords: IKeywordResponseList;
  ownKeywords: IKeywordResponseList;
  onRemoveKeyword: (keywordId: number) => void;
  onAddKeyword: (keywordId: number) => void;
  onClose: () => void;
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <Typography
        size="2xl"
        weight="semibold"
        classNameStyles="text-center mb-4"
      >
        자녀가 풀 퀴즈의 키워드를 설정할 수 있어요!
      </Typography>
      <Typography
        color="dark"
        size="xl"
        weight="semibold"
        classNameStyles="mb-4"
      >
        키워드 제거
      </Typography>
      <div className="flex flex-wrap gap-2 mb-6">
        {ownKeywords.map((item) => (
          <Button
            key={item.keywordId}
            size="sm"
            color="danger"
            onClick={() => onRemoveKeyword(item.keywordId)}
          >
            <Typography color="light">{item.keyword}</Typography>
          </Button>
        ))}
      </div>

      <Typography
        color="dark"
        size="xl"
        weight="semibold"
        classNameStyles="mb-4"
      >
        키워드 추가
      </Typography>
      <div className="flex flex-wrap gap-2">
        {keywords
          .filter(
            (item) =>
              !ownKeywords.some((own) => own.keywordId === item.keywordId),
          )
          .map((item) => (
            <Button
              key={item.keywordId}
              size="sm"
              color="primary"
              onClick={() => onAddKeyword(item.keywordId)}
            >
              <Typography color="light">{item.keyword}</Typography>
            </Button>
          ))}
        <Button fullWidth={true} classNameStyles="mt-8" onClick={onClose}>
          닫기
        </Button>
      </div>
    </div>
  );
};

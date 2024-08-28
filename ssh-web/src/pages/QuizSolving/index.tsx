import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import REQUEST_DOMAINS from '../../apis/axiosConfig';
import { api } from '../../apis/interceptors';
import { isModalOpenState } from '../../atoms/modal';
import { resizeState } from '../../atoms/resize';
import { Button } from '../../components/atoms/Button';
import { Typography } from '../../components/atoms/Typography';
import { Mascot } from '../../components/molecules/Mascot';
import { Modal } from '../../components/molecules/Modal';
import { QuizDetail } from '../../components/molecules/QuizDetail';
import {
  IDailyQuizResponse,
  IQuizResultResponse,
} from '../../interfaces/quizInterface';
import { EResize } from '../../themes/themeBase';
import {
  ModalContentStyles,
  button,
  container,
  containerStyles,
  title,
} from './styles';

export const QuizSolving: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<'O' | 'X' | null>(null);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const [quizData, setQuizData] = useState<IDailyQuizResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [quizResult, setQuizResult] = useState<IQuizResultResponse | null>(
    null,
  );
  const size = useRecoilValue<EResize>(resizeState);

  //오늘의 퀴즈 api
  useEffect(() => {
    setLoading(true);
    api
      .get(`/${REQUEST_DOMAINS.quizs}/today`)
      .then((response) => {
        setQuizData(response.data);
        setLoading(false);
        console.log(response);
      })
      .catch((error: Error) => {
        setError(error.message || '퀴즈를 불러오지 못했습니다.');
        setLoading(false);
      });
  }, []);

  const handleSelectOption = (option: 'O' | 'X') => {
    setSelectedOption(option);
  };

  //퀴즈 제출시 결과 확인
  const handleSubmitAnswer = () => {
    if (selectedOption && quizData) {
      api
        .post(`/${REQUEST_DOMAINS.quizs}/solve`, {
          quizId: quizData.quizId,
          answer: selectedOption === 'O',
        })
        .then((response) => {
          setQuizResult(response.data);
          setIsModalOpen({
            isOpen: true,
            content: (
              <div className={ModalContentStyles.container({ size })}>
                <h1 className={ModalContentStyles.title({ size })}>
                  <Typography color="dark" size="2xl" weight="bold">
                    {response.data.isCorrect ? '정답입니다!' : '틀렸어요...'}
                  </Typography>
                </h1>
                <img
                  src={
                    response.data.isCorrect
                      ? 'https://media.tenor.com/EBBE8SMl93gAAAAi/pepe-yay.gif'
                      : 'https://media1.tenor.com/m/5aF7np_zPEgAAAAd/pepe-why-pepe-the-frog.gif'
                  }
                  alt={
                    response.data.isCorrect ? '기뻐하는 페페' : '슬퍼하는 페페'
                  }
                  className={ModalContentStyles.image({ size })}
                />
                <div className={ModalContentStyles.caption({ size })}>
                  <Typography color="secondary">
                    {response.data.isCorrect
                      ? response.data.quizExplanation || '맞아요!'
                      : '정답은 ' +
                        (response.data.realAnswer ? 'O' : 'X') +
                        '에요'}
                  </Typography>
                </div>
                <Button
                  fullWidth={true}
                  onClick={() =>
                    setIsModalOpen({ isOpen: false, content: null })
                  }
                >
                  확인
                </Button>
              </div>
            ),
          });
        })
        .catch((error: Error) => {
          console.log(error);
          setError(error.message || '정답을 제출하는데 실패했습니다.');
        });
    }
  };

  return (
    <div className={containerStyles()}>
      {size === EResize.D && (
        <Mascot nickname="닉네임" ment="오늘의 퀴즈를 한번 풀어보세요!" />
      )}
      <div className={container({ size })}>
        <div className={title({ size })}>
          <Typography weight="bold" size="3xl">
            오늘의 퀴즈
          </Typography>
        </div>
        <QuizDetail
          description={quizData?.description ?? ''}
          keyword={quizData?.keyword ?? ''}
          quizId={quizData?.quizId ?? 0}
          loading={loading}
          size={size}
          error={error ?? ''}
        >
          <></>
        </QuizDetail>
        <div className="flex justify-around align gap-4">
          <button
            className={button({
              variant: selectedOption === 'O' ? 'correct' : 'default',
              selected: selectedOption === 'O',
              size,
            })}
            onClick={() => handleSelectOption('O')}
          >
            O
          </button>
          <button
            className={button({
              variant: selectedOption === 'X' ? 'incorrect' : 'default',
              selected: selectedOption === 'X',
              size,
            })}
            onClick={() => handleSelectOption('X')}
          >
            X
          </button>
        </div>
        <div />
        <div />
        <Button fullWidth={true} onClick={handleSubmitAnswer}>
          정답확인
        </Button>
      </div>
      <Modal />
    </div>
  );
};

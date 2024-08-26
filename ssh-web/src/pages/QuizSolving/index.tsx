import React, { useState, useEffect } from 'react';
import { Typography } from '../../components/atoms/Typography';
import { Button } from '../../components/atoms/Button';
import { Modal } from '../../components/molecules/Modal';
import { EResize } from '../../themes/themeBase';
import { resizeState } from '../../atoms/resize';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isModalOpenState } from '../../atoms/modal';
import { api } from '../../apis/interceptors';
import REQUEST_DOMAINS from '../../apis/axiosConfig';
import { QuizDetail } from '../../components/molecules/QuizDetail';
import { styles, container, title, button } from './styles';
import {
  IDailyQuizResponse,
  IQuizResultResponse,
} from '../../interfaces/quizInterface';

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
              <div className={styles.container({ size })}>
                <h1 className={styles.title({ size })}>
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
                  className={styles.image({ size })}
                />
                <p className={styles.caption({ size })}>
                  <Typography color="secondary">
                    {response.data.isCorrect
                      ? response.data.quizExplanation || '맞아요!'
                      : '정답은 ' +
                        (response.data.realAnswer ? 'O' : 'X') +
                        '에요'}
                  </Typography>
                </p>
                <Button
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
    <>
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
        <div className="flex justify-center gap-4">
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

        <Button fullWidth={true} onClick={handleSubmitAnswer}>
          정답확인
        </Button>
      </div>
      <Modal />
    </>
  );
};

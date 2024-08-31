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
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../utils/toastUtil';
import crying from './Crying.png';
import yay from './yay.png';

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
  const navigate = useNavigate();

  //오늘의 퀴즈 api
  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/users/info`)
      .then((response) => {
        if (response.data.type === 'PARENT') {
          showToast('error', '아이만 접근할 수 있는 기능입니다');
          navigate('/quiz');
        }
      })
      .catch((error: Error) => {
        showToast('error', '현재 유저의 정보를 불러오지 못했습니다.');
      });
    api
      .get(`/api/quizzes/today`)
      .then((response) => {
        setQuizData(response.data);
        setLoading(false);
      })
      .catch((error: Error) => {
        showToast('error', '퀴즈를 불러오지 못했어요');
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
        .post(`/api/quizzes/solve`, {
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
                  src={response.data.isCorrect ? yay : crying}
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
                  onClick={() => {
                    setIsModalOpen({ isOpen: false, content: null });
                    navigate('/quiz');
                  }}
                >
                  확인
                </Button>
              </div>
            ),
          });
        })
        .catch((error: Error) => {
          console.log(error);
          showToast('error', '정답을 제출하는데 실패했어요');
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

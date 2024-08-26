import React, { useEffect, useState } from 'react';
import { ToggleTab } from '../../components/atoms/ToggleTab';
import { Typography } from '../../components/atoms/Typography';
import { resizeState } from '../../atoms/resize';
import { EResize } from '../../themes/themeBase';
import { useRecoilValue } from 'recoil';
import { api } from '../../apis/interceptors';
import { AvatarWithLabel } from '../../components/molecules/AvatarWithLabel';
import { Button } from '../../components/atoms/Button';
import { Main } from './styles';
import { QuizTab } from '../../components/organisms/QuizTab';
import { KeywordsTab } from '../../components/organisms/QuizKeywordTab';
import {
  IQuizLogResponse,
  IQuizLogResponseList,
} from '../../interfaces/quizInterface';
const labels = ['쏠쏠 퀴즈', '키워드 및 내역'];

//퀴즈 로그를 통해 오늘 퀴즈를 풀었는지 체크하는 함수
const checkTodayQuiz = (
  quizLogs: IQuizLogResponseList,
  setIsTodayQuiz: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  // 오늘 날짜 가져오기 (YYYY-MM-DD 형식)
  const today = new Date()
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '-')
    .replace('.', '');

  // 가장 최신의 quizLog 데이터 확인
  if (quizLogs.length > 0) {
    const latestQuiz = quizLogs[0]; // 날짜가 최신순이므로 첫 번째 항목이 가장 최신
    const quizDate = latestQuiz.correctedAt.split(' ')[0]; // 날짜만 추출

    // 오늘 날짜와 일치하는지 확인
    if (quizDate === today) {
      setIsTodayQuiz(true);
    }
  }
};

export const QuizMain: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isTodayQuiz, setIsTodayQuiz] = useState<boolean>(false);
  const [quizLogs, setQuizLog] = useState<IQuizLogResponseList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [childId, setChildId] = useState<number>(1);

  const size = useRecoilValue<EResize>(resizeState);

  useEffect(() => {
    setLoading(true);
    api
      .get(`api/child/${childId}/quizzes/solved?page=0`)
      .then((response) => {
        setQuizLog(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message || '퀴즈 로그 조회 실패');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (quizLogs.length > 0) {
      checkTodayQuiz(quizLogs, setIsTodayQuiz);
    }
  }, [quizLogs]); // quizLogs가 업데이트될 때마다 실행

  return (
    <div className={Main.container({ size })}>
      <div className="flex flex-row justify-between">
        <Typography size="2xl" weight="bold" color="dark">
          쏠쏠 퀴즈
        </Typography>
        <div className="flex flex-row items-center mb-2 p-2 px-4 bg-primary-100 rounded-lg p">
          <AvatarWithLabel
            imageUrl="https://media1.tenor.com/m/o2nJ-w0v7lAAAAAC/teemo.gif"
            altText="캐릭터"
            size="md"
            bgColor="blue"
            label="차은우"
            labelSize="md"
            labelWeight="bold"
            labelColor="dark"
          ></AvatarWithLabel>
          <Button size="sm" classNameStyles="ml-2">
            변경
          </Button>
        </div>
      </div>
      <div className="flex mb-4">
        <ToggleTab
          activeTab={activeTab}
          onTabChange={(index: number) => {
            setActiveTab(index);
          }}
          labels={labels}
          outlined={false}
          color="dark"
        />
      </div>

      <div>
        {activeTab === 0 ? (
          <QuizTab
            size={size}
            isTodayQuiz={isTodayQuiz}
            childId={childId}
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <KeywordsTab
            size={size}
            quizLogs={quizLogs}
            childId={childId}
            setLoading={setLoading}
          />
        )}
      </div>
    </div>
  );
};

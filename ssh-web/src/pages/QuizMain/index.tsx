import React, { useEffect, useMemo, useState } from 'react';
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
import {
  KeywordEditModal,
  KeywordsTab,
} from '../../components/organisms/QuizKeywordTab';
import {
  IKeywordResponseList,
  IStrickResponseList,
} from '../../interfaces/quizInterface';
import {
  IQuizLogResponse,
  IQuizLogResponseList,
} from '../../interfaces/quizInterface';
import { Modal } from '../../components/molecules/QuizModal';
import { QuizLogsDetailModal } from '../../components/organisms/QuizLogsDetailModal';

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
  const [childNickname, setChildNickname] = useState<string>('chacha');
  const [strick, setStrick] = useState<IStrickResponseList>([]);
  const [keywords, setKeywords] = useState<IKeywordResponseList>([]);
  const [ownKeywords, setOwnKeywords] = useState<IKeywordResponseList>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openQuizId, setOpenQuizId] = useState<number>(0);
  const [isKeywordModal, setIsKeywordModal] = useState(false);
  const size = useRecoilValue<EResize>(resizeState);

  const onRemoveKeyword = () => {};

  const onAddKeyword = () => {};

  const onClose = () => {
    setIsModalOpen(false);
  };

  const openKeywordModal = () => {
    setIsKeywordModal(true);
    setIsModalOpen(true);
  };

  const openQuizLogsModal = () => {
    setIsKeywordModal(false);
    setIsModalOpen(true);
  };

  const toggleQuizDetail = (quizId: number) => {
    setOpenQuizId(openQuizId === quizId ? 0 : quizId);
  };

  useMemo(() => {
    setLoading(true);
    api
      .get(`api/child/${childNickname}/quizzes/solved?page=0`)
      .then((response) => {
        setQuizLog(response.data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message || '퀴즈 로그 조회 실패');
        setLoading(false);
      });
  }, [childNickname]);

  useMemo(() => {
    api.get(`api/child/${childNickname}/quizzes/strick`).then((response) => {
      setStrick(response.data);
      setLoading(false);
    });
  }, [childNickname]);

  useMemo(() => {
    api.get(`api/quizzes/keywords`).then((response) => {
      setKeywords(response.data);
      setLoading(false);
    });
  }, []);

  useMemo(() => {
    api.get(`api/children/${childNickname}/keywords`).then((response) => {
      setOwnKeywords(response.data);
      setLoading(false);
    });
  }, [childNickname]);

  useEffect(() => {
    if (quizLogs.length > 0) {
      checkTodayQuiz(quizLogs, setIsTodayQuiz);
    }
  }, [quizLogs]); // quizLogs가 업데이트될 때마다 실행

  return (
    <>
      <Modal color="primary" isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        {isKeywordModal ? (
          <KeywordEditModal
            keywords={keywords}
            ownKeywords={ownKeywords}
            onRemoveKeyword={onRemoveKeyword}
            onAddKeyword={onAddKeyword}
            onClose={onClose}
          />
        ) : (
          <QuizLogsDetailModal
            quizLogs={quizLogs}
            openQuizId={openQuizId}
            toggleQuizDetail={toggleQuizDetail}
          />
        )}
      </Modal>
      <div className={Main.container({ size })}>
        <div className={Main.content({ size })}>
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
            <Button size="sm" classNameStyles="ml-4">
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
              childNickname={childNickname}
              loading={loading}
              setLoading={setLoading}
              isParent={true}
              strick={strick}
            />
          ) : (
            <KeywordsTab
              size={size}
              quizLogs={quizLogs}
              childNickname={childNickname}
              setLoading={setLoading}
              keywords={keywords}
              ownKeywords={ownKeywords}
              isParent={true}
              openKeywordModal={openKeywordModal}
              openQuizLogsModal={openQuizLogsModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

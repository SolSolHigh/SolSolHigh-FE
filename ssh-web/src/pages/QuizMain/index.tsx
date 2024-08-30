import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from '../../apis/interceptors';
import { resizeState } from '../../atoms/resize';
import { ToggleTab } from '../../components/atoms/ToggleTab';
import { Typography } from '../../components/atoms/Typography';
import { ChangeChild } from '../../components/molecules/ChangeChild';
import { Mascot } from '../../components/molecules/Mascot';
import { Modal } from '../../components/molecules/QuizModal';
import {
  KeywordEditModal,
  KeywordsTab,
} from '../../components/organisms/QuizKeywordTab';
import { QuizLogsDetailModal } from '../../components/organisms/QuizLogsDetailModal';
import { QuizTab } from '../../components/organisms/QuizTab';
import {
  IKeywordResponseList,
  IQuizLogResponseList,
  IStrickResponseList,
} from '../../interfaces/quizInterface';
import { EResize } from '../../themes/themeBase';
import { containerStyles } from './styles';
import { IChild } from '../../interfaces/userInterface';
import { showToast } from '../../utils/toastUtil';

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
  const [childrenList, setChildrenList] = useState<IChild[]>([]);
  const [selectedChild, setSelectedChild] = useState<number>(0);
  const [strick, setStrick] = useState<IStrickResponseList>([]);
  const [keywords, setKeywords] = useState<IKeywordResponseList>([]);
  const [ownKeywords, setOwnKeywords] = useState<IKeywordResponseList>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openQuizId, setOpenQuizId] = useState<number>(0);
  const [isKeywordModal, setIsKeywordModal] = useState(false);
  const [isParent, setIsParent] = useState<boolean | null>(null);
  const [childNickname, setChildNickname] = useState<string>('');
  const size = useRecoilValue<EResize>(resizeState);

  //todo
  const onRemoveKeyword = (keywordId: number) => {
    if (isParent) {
      api
        .post(`/api/children/keywords`, {
          nickname: childrenList[selectedChild].nickname,
          keywordId: keywordId,
        })
        .then((response) => {
          showToast('success', '키워드를 삭제했어요');
        })
        .catch((error: Error) => {
          showToast('error', '키워드를 삭제하지 못했어요');
        });
    }
  };

  //todo
  const onAddKeyword = (keywordId: number) => {
    if (isParent) {
      api
        .patch(`/api/children/keywords`, {
          nickname: childrenList[selectedChild].nickname,
          keywordId: keywordId,
        })
        .then((response) => {
          showToast('success', '키워드를 추가했어요');
        })
        .catch((error: Error) => {
          showToast('error', '키워드를 추가하지 못했어요');
        });
    }
  };

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

  useEffect(() => {
    api
      .get(`/api/users/info`)
      .then((response) => {
        if (response.data.type === 'PARENT') {
          setIsParent(true);
        } else {
          setIsParent(false);
        }
      })
      .catch((error: Error) => {
        showToast('error', '현재 유저의 정보를 불러오지 못했습니다.');
      });
  }, []);

  useEffect(() => {
    if (isParent) {
      setLoading(true);
      api
        .get(
          `api/child/${childrenList[selectedChild].nickname}/quizzes/solved?page=0`,
        )
        .then((response) => {
          setQuizLog(response.data);
          setLoading(false);
        })
        .catch((error: Error) => {
          showToast('error', '퀴즈 로그를 불러오지 못했어요');
          setLoading(false);
        });

      api
        .get(`api/child/${childrenList[selectedChild].nickname}/quizzes/strick`)
        .then((response) => {
          setStrick(response.data);
          setLoading(false);
        })
        .catch((error: Error) => {
          showToast('error', '퀴즈 스트릭을 불러오지 못했어요');
        });
      api
        .get(`api/children/${childrenList[selectedChild].nickname}/keywords`)
        .then((response) => {
          setOwnKeywords(response.data);
          setLoading(false);
        })
        .catch((error: Error) => {
          showToast('error', '퀴즈 키워드를 불러오지 못했어요');
        });
    }
    if (!isParent) {
      setLoading(true);
      api
        .get(`api/child/${childNickname}/quizzes/solved?page=0`)
        .then((response) => {
          setQuizLog(response.data);
          setLoading(false);
        })
        .catch((error: Error) => {
          showToast('error', '퀴즈 로그를 불러오지 못했어요');
          setLoading(false);
        });
      api
        .get(`api/child/${childNickname}/quizzes/strick`)
        .then((response) => {
          setStrick(response.data);
          setLoading(false);
        })
        .catch((error: Error) => {
          showToast('error', '퀴즈 스트릭을 불러오지 못했어요');
        });
      api.get(`api/children/${childNickname}/keywords`).then((response) => {
        setOwnKeywords(response.data);
        setLoading(false);
      });
    }
  }, [selectedChild]);

  useEffect(() => {
    if (quizLogs.length > 0) {
      checkTodayQuiz(quizLogs, setIsTodayQuiz);
    }
  }, [quizLogs]); // quizLogs가 업데이트될 때마다 실행

  return (
    <div className={containerStyles({ size })}>
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
      <Mascot
        nickname="닉네임"
        ment="오늘의 퀴즈를 한번 풀어보세요!"
        classNameStyles={'tablet:hidden'}
      />
      <div className="bg-white flex flex-col items-center w-full tablet:h-full mob:p-4 tabletB:p-6 desktop:rounded-2xl desktop:px-4 desktop:max-w-[48rem] desktop:h-[48rem]">
        <div className="flex flex-row w-full justify-between">
          <Typography
            size="2xl"
            weight="bold"
            color="dark"
            classNameStyles={isParent ? ' ' : 'mb-4'}
          >
            쏠쏠 퀴즈
          </Typography>
          {isParent && (
            <ChangeChild
              childrenList={childrenList}
              setChildrenList={setChildrenList}
              selectedChild={selectedChild}
              setSelectedChild={setSelectedChild}
            />
          )}
        </div>
        <div className="flex w-full max-w-[48rem] mb-4">
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

        <div className="w-full max-w-[48rem]">
          {!isParent ? (
            activeTab === 0 ? (
              <QuizTab
                size={size}
                isTodayQuiz={isTodayQuiz}
                childNickname={childNickname}
                loading={loading}
                setLoading={setLoading}
                isParent={isParent ? isParent : false}
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
                isParent={isParent ? isParent : false}
                openKeywordModal={openKeywordModal}
                openQuizLogsModal={openQuizLogsModal}
              />
            )
          ) : (
            <>
              {!childrenList.length ? (
                <>자녀가 없음을 보여주는 UI</>
              ) : (
                <>
                  {activeTab === 0 ? (
                    <QuizTab
                      size={size}
                      isTodayQuiz={isTodayQuiz}
                      childNickname={childrenList[selectedChild].nickname}
                      loading={loading}
                      setLoading={setLoading}
                      isParent={isParent ? isParent : false}
                      strick={strick}
                    />
                  ) : (
                    <KeywordsTab
                      size={size}
                      quizLogs={quizLogs}
                      childNickname={
                        isParent
                          ? childNickname
                          : childrenList[selectedChild].nickname
                      }
                      setLoading={setLoading}
                      keywords={keywords}
                      ownKeywords={ownKeywords}
                      isParent={isParent ? isParent : false}
                      openKeywordModal={openKeywordModal}
                      openQuizLogsModal={openQuizLogsModal}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

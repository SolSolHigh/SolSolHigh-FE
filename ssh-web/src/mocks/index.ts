import AxiosMockAdapter from 'axios-mock-adapter';
import { api } from '../apis/interceptors';
import REQUEST_DOMAINS from '../apis/axiosConfig';

export const mock = new AxiosMockAdapter(api);

// ========== Test Domain ==========
mock.onPost(`/${REQUEST_DOMAINS.auth}/users`).reply(200, {
  users: [{ id: 1, name: 'John Smith' }],
});

mock.onGet(`/${REQUEST_DOMAINS.auth}/examples`).reply(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          examples: [
            { id: 1, name: '스켈레톤 테스트용 1', number: 100 },
            { id: 2, name: '스켈레톤 테스트용 2', number: 200 },
            { id: 3, name: '스켈레톤 테스트용 3', number: 300 },
          ],
        },
      ]);
    }, 500);
  });
});
// ========== Test Domain ==========

// ========== 퀴즈 도메인 ==========
//오늘자 퀴즈 조회
mock.onGet(`/${REQUEST_DOMAINS.quizs}/today`).reply(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          description:
            '적금 통장에 한번 넣은 돈은 언제든 자유롭게 출금할 수 있다!',
          keyword: '통장',
          quizId: 1,
        },
      ]);
    }, 500);
  });
});

//퀴즈 정답 확인
mock.onPost(`/${REQUEST_DOMAINS.quizs}/solve`).reply((config) => {
  return new Promise((resolve) => {
    const requestData = JSON.parse(config.data);
    const { quizId } = requestData;

    setTimeout(() => {
      if (quizId === 1) {
        // 예시로 quizId = 1인 경우
        const realAnswer = false; // 실제 정답을 가정

        // 사용자가 제출한 답안과 실제 정답을 비교하여 isCorrect를 결정
        const isCorrect = requestData.answer === realAnswer;

        if (isCorrect) {
          // 정답일 경우
          resolve([
            200,
            {
              realAnswer,
              isCorrect,
              quizExplanation: '맞아요 ~ [해설]입니다.',
            },
          ]);
        } else {
          // 오답일 경우
          resolve([
            200,
            {
              realAnswer,
              isCorrect,
            },
          ]);
        }
      } else {
        // quizId가 일치하지 않을 경우
        resolve([404, { message: 'Quiz not found' }]);
      }
    }, 500); // 딜레이
  });
});

const childId = 1;
//퀴즈 풀이 내역 조회
mock.onGet(`api/child/${childId}/quizzes/solved?page=0`).reply(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        [
          {
            description: '문제~~~~~~~~ 나갑니다!',
            keyword: '이자',
            quizId: 1,
            isCorrect: true,
            quizExplanation: '맞아요, ~~~~~',
            correctedAt: '2024-08-25 06:05:22',
          },
          {
            description: '문제~~~~~~~~ 나갑니다!',
            keyword: '이자',
            quizId: 2,
            isCorrect: true,
            quizExplanation: '맞아요, ~~~~~',
            correctedAt: '2024-08-24 06:05:22',
          },
          {
            description: '문제~~~~~~~~ 나갑니다!',
            keyword: '이자',
            quizId: 3,
            isCorrect: true,
            quizExplanation: '맞아요, ~~~~~',
            correctedAt: '2024-08-23 06:05:22',
          },
          {
            description: '문제~~~~~~~~ 나갑니다!',
            keyword: '이자',
            quizId: 4,
            isCorrect: false,
            quizExplanation: '맞아요, ~~~~~',
            correctedAt: '2024-08-22 06:05:22',
          },
        ],
      ]);
    }, 500);
  });
});

//스트릭 조회
mock.onGet(`api/child/${childId}/quizzes/strick`).reply(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        [
          {
            day: 1,
            isCorrect: true,
          },
          {
            day: 2,
            isCorrect: false,
          },
          {
            day: 3,
            isCorrect: true,
          },
        ],
      ]);
    }, 250);
  });
});

// ========== 퀴즈 도메인 ==========
// ========== 미션 조회 ==========
// API: /api/children/missions?page=0&size=20&is-finished=false
mock.onGet('/api/children/missions').reply((config) => {
  const isFinished =
    config.params['is-finished'] === true ||
    config.params['is-finished'] === 'true';

  const missions = [
    {
      childInfo: {
        childId: 1,
        name: '차은우',
      },
      missionId: 1,
      description: '양치하고 세수하기.',
      isFinished: false,
      missionStartAt: '2026-02-04 06:20:20',
      missionEndAt: '2026-02-04 06:20:20',
      missionFinishedAt: null,
      missionLevel: '1', // 쉬움
    },
    {
      childInfo: {
        childId: 1,
        name: '차은우',
      },
      missionId: 5,
      description: '양치하고 세수하기.',
      isFinished: false,
      missionStartAt: '2026-02-04 06:20:20',
      missionEndAt: '2026-02-04 06:20:20',
      missionFinishedAt: null,
      missionLevel: '1', // 쉬움
    },
    {
      childInfo: {
        childId: 1,
        name: '차은우',
      },
      missionId: 6,
      description: '양치하고 세수하기.',
      isFinished: false,
      missionStartAt: '2026-02-04 06:20:20',
      missionEndAt: '2026-02-04 06:20:20',
      missionFinishedAt: null,
      missionLevel: '1', // 쉬움
    },
    {
      childInfo: {
        childId: 1,
        name: '차은우',
      },
      missionId: 7,
      description: '양치하고 세수하기.',
      isFinished: false,
      missionStartAt: '2026-02-04 06:20:20',
      missionEndAt: '2026-02-04 06:20:20',
      missionFinishedAt: null,
      missionLevel: '1', // 쉬움
    },
    {
      childInfo: {
        childId: 1,
        name: '차은우',
      },
      missionId: 8,
      description: '양치하고 세수하기.',
      isFinished: false,
      missionStartAt: '2026-02-04 06:20:20',
      missionEndAt: '2026-02-04 06:20:20',
      missionFinishedAt: null,
      missionLevel: '1', // 쉬움
    },
    {
      childInfo: {
        childId: 1,
        name: '차은우',
      },
      missionId: 9,
      description: '양치하고 세수하기.',
      isFinished: false,
      missionStartAt: '2026-02-04 06:20:20',
      missionEndAt: '2026-02-04 06:20:20',
      missionFinishedAt: null,
      missionLevel: '1', // 쉬움
    },
    {
      childInfo: {
        childId: 2,
        name: '이슬기',
      },
      missionId: 2,
      description: '책 읽기.',
      isFinished: true,
      missionStartAt: '2026-02-04 06:20:20',
      missionEndAt: '2026-02-04 06:20:20',
      missionFinishedAt: '2026-02-04 08:20:20',
      missionLevel: '3', // 어려움
    },
    {
      childInfo: {
        childId: 3,
        name: '박소연',
      },
      missionId: 3,
      description: '방 청소하기.',
      isFinished: false,
      missionStartAt: '2026-02-04 07:00:00',
      missionEndAt: '2026-02-04 09:00:00',
      missionFinishedAt: null,
      missionLevel: '2', // 중간
    },
    {
      childInfo: {
        childId: 4,
        name: '김유진',
      },
      missionId: 4,
      description: '숙제하기.',
      isFinished: true,
      missionStartAt: '2026-02-04 10:00:00',
      missionEndAt: '2026-02-04 12:00:00',
      missionFinishedAt: '2026-02-04 11:30:00',
      missionLevel: '2', // 중간
    },
  ];

  const filteredMissions = missions.filter(
    (mission) => mission.isFinished === isFinished,
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([200, filteredMissions]);
    }, 500);
  });
});
// ========== 미션 조회 ==========

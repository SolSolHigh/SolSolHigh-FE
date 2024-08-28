import AxiosMockAdapter from 'axios-mock-adapter';
import { api } from '../apis/interceptors';
import REQUEST_DOMAINS from '../apis/axiosConfig';
import {
  IMissionCreateRequest,
  IMissionUpdateRequest,
} from '../interfaces/missionInterfaces';

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
// ========== 약속권 도메인 ==========

//자식이 자신의 약속권 개수 조회
mock.onGet(`/api/promise-tickets/count`).reply(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          count: 3,
        },
      ]);
    }, 500);
  });
});

mock.onGet(`/api/promise-tickets?page=0&size=5`).reply(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          totalPages: 1,
          totalElements: 1,
          size: 5,
          content: [
            {
              id: 1,
              imageUrl:
                'https://media.tenor.com/Kd1AutC90hsAAAAj/pepe-thumbs-up.gif',
              publishedAt: '2024-08-12T12:00:00',
              requestedAt: '2024-08-15T12:00:00',
              description: '엄마랑 놀이공원 놀러가고 시포',
            },
            {
              id: 2,
              imageUrl:
                'https://media.tenor.com/Kd1AutC90hsAAAAj/pepe-thumbs-up.gif',
              publishedAt: '2024-08-12T12:00:00',
              requestedAt: '2024-08-15T12:00:00',
              description: '아빠랑 놀이공원 놀러가고 시포',
            },
            {
              id: 3,
              imageUrl:
                'https://media.tenor.com/Kd1AutC90hsAAAAj/pepe-thumbs-up.gif',
              publishedAt: '2024-08-12T12:00:00',
              requestedAt: '2024-08-15T12:00:00',
              usedAt: '2024-08-18T12:00:00',
              description: '할머니랑 놀이공원 놀러가고 시포',
            },
            {
              id: 4,
              imageUrl:
                'https://media.tenor.com/Kd1AutC90hsAAAAj/pepe-thumbs-up.gif',
              publishedAt: '2024-08-12T12:00:00',
              requestedAt: '2024-08-15T12:00:00',
              usedAt: '2024-08-18T12:00:00',
              description: '할이버지랑 놀이공원 놀러가고 시포',
            },
            {
              id: 5,
              imageUrl:
                'https://media.tenor.com/Kd1AutC90hsAAAAj/pepe-thumbs-up.gif',
              publishedAt: '2024-08-12T12:00:00',
              requestedAt: '2024-08-15T12:00:00',
              usedAt: '2024-08-18T12:00:00',
              description: '누나랑 놀이공원 놀러가고 시포',
            },
            {
              id: 6,
              imageUrl:
                'https://media.tenor.com/Kd1AutC90hsAAAAj/pepe-thumbs-up.gif',
              publishedAt: '2024-08-12T12:00:00',
              requestedAt: '2024-08-15T12:00:00',
              usedAt: '2024-08-18T12:00:00',
              description: '형이랑 놀이공원 놀러가고 시포',
            },
            {
              id: 7,
              imageUrl:
                'https://media.tenor.com/Kd1AutC90hsAAAAj/pepe-thumbs-up.gif',
              publishedAt: '2024-08-12T12:00:00',
              requestedAt: '2024-08-15T12:00:00',
              usedAt: '2024-08-18T12:00:00',
              description: '친구랑 놀이공원 놀러가고 시포',
            },
            {
              id: 8,
              imageUrl:
                'https://media.tenor.com/Kd1AutC90hsAAAAj/pepe-thumbs-up.gif',
              publishedAt: '2024-08-12T12:00:00',
              requestedAt: '2024-08-15T12:00:00',
              usedAt: '2024-08-18T12:00:00',
              description: '혼자 놀이공원 놀러가고 시포',
            },
          ],
          number: 0,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true,
          },
          first: true,
          last: true,
          numberOfElements: 1,
          pageable: {
            pageNumber: 0,
            pageSize: 5,
            sort: {
              empty: true,
              sorted: false,
              unsorted: true,
            },
            offset: 0,
            paged: true,
            unpaged: false,
          },
          empty: false,
        },
      ]);
    }, 500);
  });
});

// ========== 약속권 도메인 ==========

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

const nickname = 'chacha';
//퀴즈 풀이 내역 조회
mock.onGet(`api/child/${nickname}/quizzes/solved?page=0`).reply(() => {
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
            correctedAt: '2024-08-26 06:05:22',
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
          {
            description: '문제~~~~~~~~ 나갑니다!',
            keyword: '이자',
            quizId: 5,
            isCorrect: false,
            quizExplanation: '맞아요, ~~~~~',
            correctedAt: '2024-08-21 06:05:22',
          },
          {
            description: '문제~~~~~~~~ 나갑니다!',
            keyword: '이자',
            quizId: 6,
            isCorrect: false,
            quizExplanation: '맞아요, ~~~~~',
            correctedAt: '2024-08-20 06:05:22',
          },
          {
            description: '문제~~~~~~~~ 나갑니다!',
            keyword: '이자',
            quizId: 7,
            isCorrect: false,
            quizExplanation: '맞아요, ~~~~~',
            correctedAt: '2024-08-19 06:05:22',
          },
          {
            description: '문제~~~~~~~~ 나갑니다!',
            keyword: '이자',
            quizId: 8,
            isCorrect: false,
            quizExplanation: '맞아요, ~~~~~',
            correctedAt: '2024-08-18 06:05:22',
          },
          {
            description: '문제~~~~~~~~ 나갑니다!',
            keyword: '이자',
            quizId: 9,
            isCorrect: false,
            quizExplanation: '맞아요, ~~~~~',
            correctedAt: '2024-08-17 06:05:22',
          },
        ],
      ]);
    }, 250);
  });
});

//스트릭 조회
mock.onGet(`api/child/${nickname}/quizzes/strick`).reply(() => {
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

//퀴즈 키워드 조회
mock.onGet(`api/quizzes/keywords`).reply(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        [
          {
            keywordId: 1,
            keyword: '이자',
          },
          {
            keywordId: 2,
            keyword: '은행',
          },
          {
            keywordId: 3,
            keyword: '통장',
          },
          {
            keywordId: 4,
            keyword: '저축',
          },
          {
            keywordId: 5,
            keyword: '적금',
          },
          {
            keywordId: 6,
            keyword: '금리',
          },
          {
            keywordId: 7,
            keyword: '화폐',
          },
          {
            keywordId: 8,
            keyword: '물가',
          },
          {
            keywordId: 9,
            keyword: '대출',
          },
          {
            keywordId: 10,
            keyword: '투자',
          },
        ],
      ]);
    }, 500);
  });
});

//자식에게 할당된 키워드 조회
mock.onGet(`api/children/${nickname}/keywords`).reply(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        [
          {
            keywordId: 1,
            keyword: '이자',
          },
          {
            keywordId: 2,
            keyword: '은행',
          },
          {
            keywordId: 3,
            keyword: '통장',
          },
          {
            keywordId: 4,
            keyword: '저축',
          },
        ],
      ]);
    }, 250);
  });
});

// ========== 퀴즈 도메인 ==========

// ========== 미션 도메인 ==========
// 미션 조회
mock.onGet('/api/children/missions').reply((config) => {
  // /api/children/missions?page=0&size=20&is-finished=false
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

// 미션 등록
mock.onPost('/api/children/missions').reply((config) => {
  const requestData: IMissionCreateRequest = JSON.parse(config.data);

  const createdMission = {
    ...requestData,
    missionId: Math.floor(Math.random() * 1000), // 랜덤 missionId 생성
    isFinished: false,
    missionFinishedAt: null,
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([201, createdMission]);
    }, 500);
  });
});

// 미션 삭제
mock.onDelete(/\/api\/missions\/\d+/).reply((config) => {
  const missionId = config.url?.split('/').pop();

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        204,
        { message: `미션 ${missionId}이 성공적으로 삭제되었습니다.` },
      ]);
    }, 500);
  });
});

// 미션 수정 (상태 변경 포함)
mock.onPatch(/\/api\/missions\/\d+/).reply((config) => {
  const missionId = config.url?.split('/').pop();
  const requestData: IMissionUpdateRequest = JSON.parse(config.data);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        202,
        {
          message: `미션 ${missionId}이 성공적으로 수정되었습니다.`,
          updatedData: requestData,
        },
      ]);
    }, 500);
  });
});
// ========== 미션 도메인 ==========

// ========== 사용자 도메인 ==========
mock.onGet('/api/users/info').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          nickname: 'yuseung0429',
          email: 'yuseung0429@naver.com',
          name: '이유승',
          gender: Math.floor(Math.random() * 2) ? 'MALE' : 'FEMALE',
          birthday: '1998-04-29',
          type: Math.floor(Math.random() * 2) ? 'PARENT' : 'CHILD',
        },
      ]);
    }, 500);
  });
});

mock.onGet('/api/parents/children').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        [
          {
            name: '김다운',
            nickname: '흑룡',
            birthday: '1999-06-30',
            gender: Math.floor(Math.random() * 2) ? 'MALE' : 'FEMALE',
          },
          {
            name: '양규현',
            nickname: '백룡',
            birthday: '1999-05-30',
            gender: Math.floor(Math.random() * 2) ? 'MALE' : 'FEMALE',
          },
        ],
      ]);
    }, 500);
  });
});

mock.onGet('/api/children/parents').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          name: '부모님',
          nickname: '부모님닉네임',
          birthday: '1970-03-13',
          gender: Math.floor(Math.random() * 2) ? 'MALE' : 'FEMALE',
        },
      ]);
    }, 500);
  });
});

mock.onGet('/api/parents/children/waiting').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        [
          {
            name: '권용진',
            nickname: '흑룡도포기한남자',
            birthday: '1997-05-17',
            gender: Math.floor(Math.random() * 2) ? 'MALE' : 'FEMALE',
          },
          {
            name: '이유승',
            nickname: '뼛속까지섹시녀',
            birthday: '1998-04-29',
            gender: Math.floor(Math.random() * 2) ? 'MALE' : 'FEMALE',
          },
        ],
      ]);
    }, 500);
  });
});

mock.onGet('/api/children/parents/waiting').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          name: '권용진',
          nickname: '흑룡도포기한남자',
          birthday: '1997-05-17',
          gender: Math.floor(Math.random() * 2) ? 'MALE' : 'FEMALE',
        },
      ]);
    }, 500);
  });
});

mock.onPatch('/api/parents/children').reply((config) => {
  const target = JSON.parse(config.data).nickname;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        201,
        {
          code: null,
          description: '등록된 자식 삭제 성공',
        },
      ]);
    }, 500);
  });
});

mock.onPatch('/api/parents/children/waiting').reply((config) => {
  const target = JSON.parse(config.data).nickname;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        201,
        {
          code: null,
          description: '등록된 자식 신청 삭제 성공',
        },
      ]);
    }, 500);
  });
});

mock.onPost('/api/children').reply((config) => {
  const target = JSON.parse(config.data).nickname;

  return target === '귀요미요하'
    ? new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            200,
            {
              name: '김다운',
              nickname: '귀욤다운',
              birthday: '1999-06-30',
              gender: Math.floor(Math.random() * 2) ? 'MALE' : 'FEMALE',
            },
          ]);
        }, 500);
      })
    : new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            404,
            {
              code: 'U003',
              description: '존재하지 않는 사용자',
            },
          ]);
        }, 500);
      });
});

mock.onPost('/api/parents/children/request').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        202,
        {
          code: null,
          description: '자식 신청 성공',
        },
      ]);
    }, 500);
  });
});

// ========== 사용자 도메인 ==========

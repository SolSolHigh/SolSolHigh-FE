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
          description: "적금 통장에 한번 넣은 돈은 언제든 자유롭게 출금할 수 있다!",
          keyword: "통장",
          quizId: 1
        },
      ]);
    }, 500);
  })
})

//퀴즈 정답 확인
mock.onPost(`/${REQUEST_DOMAINS.quizs}/solve`).reply(config => {
  return new Promise((resolve) => {
    const requestData = JSON.parse(config.data);
    const { quizId } = requestData;

    setTimeout(() => {
      if (quizId === 1) {  // 예시로 quizId = 1인 경우
        const realAnswer = false; // 실제 정답을 가정
        
        // 사용자가 제출한 답안과 실제 정답을 비교하여 isCorrect를 결정
         const isCorrect = requestData.answer === realAnswer;

        if (isCorrect) {
          // 정답일 경우
          resolve([200, {
            realAnswer,
            isCorrect,
            quizExplanation: "맞아요 ~ 좋은 설명입니다.",
          }]);
        } else {
          // 오답일 경우
          resolve([200, {
            realAnswer,
            isCorrect,
          }]);
        }
      } else {
        // quizId가 일치하지 않을 경우
        resolve([404, { message: 'Quiz not found' }]);
      }
    }, 500); // 딜레이
  });
});

// ========== 퀴즈 도메인 ==========


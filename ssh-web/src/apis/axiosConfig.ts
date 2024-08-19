type Domain = 'auth' | 'users' | 'quizs' | 'accounts' | 'promises' | 'missions';

/** 도메인 맵핑 객체
 *
 * API 명세가 합의되면 하위 엔드포인트도 추가로 만들어서 타이핑
 */
const REQUEST_DOMAINS: Record<Domain, Domain> = {
  auth: 'auth',
  users: 'users',
  quizs: 'quizs',
  accounts: 'accounts',
  promises: 'promises',
  missions: 'missions',
};

export default REQUEST_DOMAINS;

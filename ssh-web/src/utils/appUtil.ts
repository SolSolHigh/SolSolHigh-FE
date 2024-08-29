const targets = [
  '/login',
  '/signup',
  '/mypage',
  '/manage',
  '/quiz/solve',
  '/request',
];

export const isTarget = (path: string) => targets.includes(path);

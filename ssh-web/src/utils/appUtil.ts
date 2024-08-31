const targets = ['/login', '/signup', '/manage', '/quiz/solve', '/request'];

export const isTarget = (path: string) => targets.includes(path);
export const getNavBgColor = (path: string) => {
  if (
    path === '/menu' ||
    path === '/mypage' ||
    path === '/egg' ||
    path === '/market'
  )
    return 'bg-primary-100';
  else return 'bg-white';
};
export const getNavHasBack = (path?: string) => {
  if (!path) return false;
  return true;
};
export const getHasBottom = (path: string) => {
  if (path === '/mypage' || path === '/quiz/solve') return false;
  return true;
};

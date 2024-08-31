import { useEffect } from 'react';
import { checkSession } from '../apis/userApi';
import { showToast } from '../utils/toastUtil';

export const useSessionCheck = () => {
  useEffect(() => {
    checkSession().catch(() =>
      showToast('error', '로그인 세션이 만료되었습니다'),
    );
  }, []);
};

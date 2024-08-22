import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isModalOpenState } from '../atoms/modal';

export const useLockBodyScroll = () => {
  const isModalOpen = useRecoilValue(isModalOpenState);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);
};

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isModalOpenState } from '../atoms/modal';

export const useCloseModalOnRouteChange = () => {
  const location = useLocation();
  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  useEffect(() => {
    setIsModalOpen({ isOpen: false, content: null });
  }, [location, setIsModalOpen]);

  return null;
};

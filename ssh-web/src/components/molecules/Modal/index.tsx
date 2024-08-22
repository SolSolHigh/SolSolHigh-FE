import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isModalOpenState } from '../../../atoms/modal';
import { resizeState } from '../../../atoms/resize';
import { EResize } from '../../../themes/themeBase';
import { ModalContent } from './ModalContent';
interface IModalProps {
  children: React.ReactNode;
}

export const Modal = ({ children }: IModalProps) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const size = useRecoilValue<EResize>(resizeState);

  if (!isModalOpen) return null;

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContent size={size} onClose={handleModalClose}>
      {children}
    </ModalContent>
  );
};

import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isModalOpenState } from '../../../atoms/modal';
import { resizeState } from '../../../atoms/resize';
import { ModalContent } from './ModalContent';

interface IModalProps {
  color?: 'primary' | 'light';
}

export const Modal = ({ color = 'primary' }: IModalProps) => {
  const [modalState, setModalState] = useRecoilState(isModalOpenState);
  const size = useRecoilValue(resizeState);

  if (!modalState.isOpen) return null;

  const handleModalClose = () => {
    setModalState({ isOpen: false, content: null });
  };

  return (
    <ModalContent size={size} onClose={handleModalClose} color={color}>
      {modalState.content}
    </ModalContent>
  );
};

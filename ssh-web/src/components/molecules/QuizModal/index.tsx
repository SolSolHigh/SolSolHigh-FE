import React, {
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { useRecoilValue } from 'recoil';
import { resizeState } from '../../../atoms/resize';
import { ModalContent } from './ModalContent';

interface IModalProps {
  color?: 'primary' | 'light';
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export const Modal = ({
  color = 'primary',
  isOpen,
  setIsOpen,
  children,
}: IModalProps) => {
  const size = useRecoilValue(resizeState);

  if (!isOpen) return null;

  const handleModalClose = () => {
    setIsOpen(false); // 모달을 닫도록 상태 변경
  };

  return (
    <>
      <div className="fixed inset-0 z-20 bg-black bg-opacity-10 animate-fadeIn"></div>
      <ModalContent size={size} onClose={handleModalClose} color={color}>
        {children}
      </ModalContent>
    </>
  );
};

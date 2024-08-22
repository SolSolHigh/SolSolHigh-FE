import React from 'react';
import { ModalCloseButton } from './ModalCloseButton';
import { EResize } from '../../../themes/themeBase';

interface ModalContentProps {
  size: EResize;
  children: React.ReactNode;
  onClose: () => void;
}

export const ModalContent = ({
  size,
  children,
  onClose,
}: ModalContentProps) => {
  const modalStyles = {
    M: 'fixed px-4 pt-8 bottom-0 rounded-t-3xl z-20 animate-popIn w-full h-2/3 bg-primary-100',
    T: 'absolute px-[10%] py-[8%] max-w-[700px] min-w-[430px] z-20 top-4 left-1/2 -translate-x-1/2 animate-popIn w-2/3 h-[calc(100vh-14rem)] flex justify-center items-center rounded-xl bg-primary-100',
    D: 'absolute px-[10%] py-[8%] max-w-[700px] min-w-[430px] z-20 top-20 left-1/2 -translate-x-1/2 animate-popIn w-2/3 h-[calc(100vh-14rem)] flex justify-center items-center rounded-xl bg-primary-100',
  };

  return (
    <div className={modalStyles[size]}>
      {size !== EResize.M && <ModalCloseButton onClose={onClose} />}
      {children}
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { ModalCloseButton } from './ModalCloseButton';
import { EResize } from '../../../themes/themeBase';

interface IModalContentProps {
  size: EResize;
  color: 'primary' | 'light';
  children: React.ReactNode;
  onClose: () => void;
}

export const ModalContent = ({
  size,
  color,
  children,
  onClose,
}: IModalContentProps) => {
  const [startY, setStartY] = useState<number | null>(null);
  const [moveY, setMoveY] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY !== null) {
      const diff = e.touches[0].clientY - startY;
      if (diff > 0) {
        setMoveY(diff);
        if (modalRef.current) {
          modalRef.current.style.transform = `translateY(${diff}px)`;
        }
      }
    }
  };

  const handleTouchEnd = () => {
    if (moveY > 100) {
      if (modalRef.current) {
        modalRef.current.style.transition = 'transform 0.3s ease-out';
        modalRef.current.style.transform = `translateY(100%)`;
      }
      setTimeout(onClose, 300);
    } else {
      if (modalRef.current) {
        modalRef.current.style.transform = `translateY(0)`;
      }
      setMoveY(0);
    }
  };

  const backgroundColors = {
    primary: 'bg-primary-100',
    light: 'bg-white',
  };

  const modalStyles = {
    M: `fixed px-4 pt-8 bottom-0 rounded-t-3xl z-20 w-full mob:h-[81%] ${backgroundColors[color]} transition-transform overflow-auto`,
    T: `absolute px-[5%] py-[2%] max-w-[700px] min-w-[430px] z-20 top-12 left-1/2 -translate-x-1/2 w-2/3 h-max min-h-[calc(100vh-24rem)] flex justify-center items-center rounded-xl ${backgroundColors[color]}`,
    D: `absolute px-[5%] py-[2%] max-w-[700px] min-w-[430px] z-20 top-10 left-1/2 -translate-x-1/2 w-2/3 h-max min-h-[calc(100vh-12rem)] flex justify-center items-center rounded-xl ${backgroundColors[color]}`,
  };

  return (
    <div
      className={modalStyles[size]}
      ref={modalRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {size === EResize.M && (
        <div className="w-12 h-1 bg-gray-400 rounded-full mt-2 mb-4 mx-auto" />
      )}
      {size !== EResize.M && <ModalCloseButton onClose={onClose} />}
      {children}
    </div>
  );
};

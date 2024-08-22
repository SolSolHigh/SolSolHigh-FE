import React from 'react';
import { Icon } from '../../atoms/Icon';
import { HiMiniXMark } from 'react-icons/hi2';

interface ModalCloseButtonProps {
  onClose: () => void;
}

export const ModalCloseButton = ({ onClose }: ModalCloseButtonProps) => (
  <button
    className="absolute top-4 right-4 flex items-center justify-center rounded-full focus:outline-none"
    onClick={onClose}
  >
    <Icon
      size="md"
      classNameStyles="!text-secondary-500 hover:!text-secondary-700 transition-colors duration-300"
    >
      <HiMiniXMark />
    </Icon>
  </button>
);

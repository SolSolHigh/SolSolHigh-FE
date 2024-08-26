import { atom } from 'recoil';

interface ModalState {
  isOpen: boolean;
  content?: React.ReactNode;
}

export const isModalOpenState = atom<ModalState>({
  key: 'isModalOpen',
  default: { isOpen: false, content: null },
});

import React, { useEffect } from 'react';
import { Modal } from '../components/molecules/Modal';
import { useSetRecoilState } from 'recoil';
import { isModalOpenState } from '../atoms/modal';
import { Button } from '../components/atoms/Button';

const Home = () => {
  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  useEffect(() => {
    // 모달을 열고, 모달 내용과 함께 상태를 설정합니다.
    setIsModalOpen({
      isOpen: true,
      content: (
        <div className="text-center bg-red-500 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">모달 예시</h2>
          <p>모달임둥</p>
          <p>모달임둥</p>
          <p>모달임둥</p>
          <p>모달임둥</p>
          <p>모달임둥</p>
          <p>모달임둥</p>
          <p>모달임둥</p>
          <Button color="secondary" className="mt-4">
            확인
          </Button>
        </div>
      ),
    });
  }, [setIsModalOpen]);

  return (
    <div className="PAGE-HOME relative w-full h-full">
      <Modal />
    </div>
  );
};

export default Home;

import React, { useEffect } from 'react';
import { Modal } from '../components/molecules/Modal';
import { useSetRecoilState } from 'recoil';
import { isModalOpenState } from '../atoms/modal';
import { Button } from '../components/atoms/Button';
const Home = () => {
  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);
  return (
    <div className="PAGE-HOME relative w-full h-full">
      <Modal>
        <Button color="secondary">secondary</Button>
        <div className="text-center bg-red-500">
          <h2 className="text-xl font-bold">모달 예시</h2>
          <p>모달임둥</p>
          <p>모달임둥</p>
          <p>모달임둥</p>
          <p>모달임둥</p>
          <p>모달임둥</p>
          <p>모달임둥</p>
          <p>모달임둥</p>
        </div>
      </Modal>
    </div>
  );
};

export default Home;

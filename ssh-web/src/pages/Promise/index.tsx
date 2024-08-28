import React, { useEffect, useState } from 'react';
import {
  containerStyles,
  contentStyles,
  gridStyles,
  layoutStyles,
} from './styles';
import { EResize } from '../../themes/themeBase';
import { resizeState } from '../../atoms/resize';
import { useRecoilValue } from 'recoil';
import { Typography } from '../../components/atoms/Typography';
import { Modal } from '../../components/molecules/QuizModal';
import { Mascot } from '../../components/molecules/Mascot';
import { AddPromiseModal } from '../../components/organisms/AddPromiseModal';
import { AddPromiseCard } from '../../components/molecules/AddPromiseCard';
import { PromiseItem } from '../../components/molecules/PromiseItem';
import { api } from '../../apis/interceptors';
import {
  IPromiseLogs,
  IPromiseLogsList,
} from '../../interfaces/promiseTicketInterface';
import { PromiseDetailModal } from '../../components/organisms/PromiseDetailModal';
import { ConfirmPromiseModal } from '../../components/organisms/ConfirmPromiseModal';
import { ChangeChild } from '../../components/molecules/ChangeChild';
import { HiOutlineTicket } from 'react-icons/hi';

export const PromiseTicket = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDetailModal, setIsDetailModal] = useState<boolean>(false);
  const [promiseLogs, setPromiseLogs] = useState<IPromiseLogsList>([]);
  const [countTicket, setCountTicket] = useState<number>(0);
  const [selectedPromise, setSelectedPromise] = useState<IPromiseLogs | null>(
    null,
  );

  // isParent를 50% 확률로 true 또는 false로 설정
  const [isParent] = useState<boolean>(() => Math.random() >= 0.5);

  const size = useRecoilValue<EResize>(resizeState);
  const isConfirm = selectedPromise?.usedAt;

  console.log(size);

  useEffect(() => {
    api.get(`/api/promise-tickets/count`).then((response) => {
      setCountTicket(response.data.count);
    });
  }, []);

  useEffect(() => {
    api.get(`/api/promise-tickets?page=0&size=5`).then((response) => {
      setPromiseLogs(response.data.content);
      console.log(response.data.content);
    });
  }, []);

  const handleDetailModal = (log: IPromiseLogs) => {
    setIsOpen(true);
    setIsDetailModal(true);
    setSelectedPromise(log);
  };

  const handleAddModal = () => {
    setIsOpen(true);
    setIsDetailModal(false);
  };

  //todo
  const handleConfirmUpload = (id: number) => {
    setIsOpen(false);
  };

  //todo
  const handlePromiseUpload = () => {
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const renderModalContent = () => {
    if (isDetailModal) {
      if (isConfirm || !isParent) {
        return (
          <PromiseDetailModal
            log={selectedPromise}
            isParent={isParent}
            closeModal={handleCloseModal}
          />
        );
      } else {
        return (
          <ConfirmPromiseModal
            log={selectedPromise}
            onUpload={handleConfirmUpload}
          />
        );
      }
    } else {
      return (
        <AddPromiseModal
          onUpload={handlePromiseUpload}
          countTicket={countTicket}
        />
      );
    }
  };

  return (
    <>
      <Modal color="primary" isOpen={isOpen} setIsOpen={setIsOpen}>
        {renderModalContent()}
      </Modal>
      <div className={layoutStyles({ size })}>
        {size === EResize.D && (
          <Mascot
            nickname="닉네임"
            ment="부모님과 어떤 약속을 하고 싶으세요?"
          />
        )}
        <div className={containerStyles({ size })}>
          <div className="flex flex-row justify-between w-[95%] mt-4">
            <Typography size="2xl" weight="bold" color="dark">
              약속권
            </Typography>
            {isParent && <ChangeChild />}
          </div>
          <div className={contentStyles({ size })}>
            <Typography
              weight="bold"
              color="light"
              size="lg"
              classNameStyles=""
            >
              보유한 약속권
            </Typography>
            <div className="flex items-center space-x-2">
              <Typography color="dark" size="xl" weight="bold">
                {countTicket}
              </Typography>
              <Typography color="light" size="xl" weight="semibold">
                개
              </Typography>

              <HiOutlineTicket size={36} fill="#fff" />
            </div>
          </div>
          <div className={gridStyles({ size })}>
            {!isParent && <AddPromiseCard handleModal={handleAddModal} />}
            {promiseLogs.map((log) => (
              <PromiseItem
                key={log.id}
                handleModal={handleDetailModal}
                isConfirm={!!log.usedAt}
                log={log}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

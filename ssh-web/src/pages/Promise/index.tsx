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
import { showToast } from '../../utils/toastUtil';
import { IChild } from '../../interfaces/userInterface';

export const PromiseTicket = () => {
  const [isParent, setIsParent] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [childrenList, setChildrenList] = useState<IChild[]>([]);
  const [selectedChild, setSelectedChild] = useState<number>(0);
  const [isDetailModal, setIsDetailModal] = useState<boolean>(false);
  const [promiseLogs, setPromiseLogs] = useState<IPromiseLogsList>([]);
  const [countTicket, setCountTicket] = useState<number>(0);
  const [selectedPromise, setSelectedPromise] = useState<IPromiseLogs | null>(
    null,
  );
  const [relenderingKey, setRelenderingKey] = useState<number>(0);
  const size = useRecoilValue<EResize>(resizeState);
  const isConfirm = selectedPromise?.usedAt;

  useEffect(() => {
    api
      .get(`/api/users/info`)
      .then((response) => {
        if (response.data.type === 'PARENT') {
          setIsParent(true);
        } else {
          setIsParent(false);
        }
      })
      .catch((error: Error) => {
        showToast('error', '현재 유저의 정보를 불러오지 못했습니다.');
      });
  }, []);

  useEffect(() => {
    if (isParent === false) {
      api
        .get(`/api/promise-tickets/count`)
        .then((response) => {
          setCountTicket(response.data.count);
        })
        .catch((error: Error) => {
          showToast('error', '약속권 갯수를 불러오지 못했습니다');
        });

      api
        .get(`/api/promise-tickets?page=0&size=50`)
        .then((response) => {
          setPromiseLogs(response.data.content);
          console.log(response.data.content);
        })
        .catch((error: Error) => {
          showToast('error', '약속권 로그를 불러오지 못했습니다');
        });
    }
    if (isParent === true && childrenList.length > 0) {
      api
        .get(
          `/api/promise-tickets/children/${childrenList[selectedChild].nickname}/count`,
        )
        .then((response) => {
          setCountTicket(response.data.count);
        })
        .catch((error: Error) => {
          showToast('error', '약속권 갯수를 불러오지 못했습니다');
        });

      api
        .get(
          `/api/promise-tickets/children/${childrenList[selectedChild].nickname}?page=0&size=50`,
        )
        .then((response) => {
          setPromiseLogs(response.data.content);
          console.log(response.data.content);
        })
        .catch((error: Error) => {
          showToast('error', '약속권 로그를 불러오지 못했습니다');
        });
    }
  }, [isParent, selectedChild, relenderingKey]);

  const handleDetailModal = (log: IPromiseLogs) => {
    setIsOpen(true);
    setIsDetailModal(true);
    setSelectedPromise(log);
  };

  const handleAddModal = () => {
    if (countTicket <= 0) {
      showToast('error', '보유한 소원권이 없어요');
    } else {
      setIsOpen(true);
      setIsDetailModal(false);
    }
  };

  //todo
  const handleConfirmUpload = async (id: number, image: FormData) => {
    setIsOpen(false);
    try {
      const response = await api.post(`/api/promise-tickets/${id}/use`, image, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      showToast('success', '약속 인증에 성공했어요!');
      setRelenderingKey(relenderingKey + 1);
      return response;
    } catch (error) {
      showToast('error', '약속 인증에 실패했어요');
    }
  };

  //todo
  const handlePromiseUpload = async (description: string) => {
    setIsOpen(false);
    try {
      const response = await api.post(`/api/promise-tickets/request/`, {
        description,
      });
      setRelenderingKey(relenderingKey + 1);
      return response;
    } catch (error) {
      showToast('error', '약속 요청에 실패했어요');
    }
    showToast('success', '부모님에게 성공적으로 약속을 요청했어요!');
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
            {isParent && (
              <ChangeChild
                childrenList={childrenList}
                setChildrenList={setChildrenList}
                selectedChild={selectedChild}
                setSelectedChild={setSelectedChild}
              />
            )}
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

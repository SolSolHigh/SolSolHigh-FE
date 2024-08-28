import React, { useEffect, useState } from 'react';
import { Mascot } from '../../components/molecules/Mascot';
import { Typography } from '../../components/atoms/Typography';
import { ToggleTab } from '../../components/atoms/ToggleTab';
import { Button } from '../../components/atoms/Button';
import { useToast } from 'react-toastify';
import { api } from '../../apis/interceptors';
import { Modal } from '../../components/molecules/QuizModal';
import TextField from '../../components/atoms/TextField';

interface IDepositItem {
  accountName: string;
  accountTypeUniqueNo: string;
  subscriptionPeriod: number;
  minSubscriptionBalance: number;
  maxSubscriptionBalance: number;
  interestRate: number;
  rateDescription: string;
  bank: string;
}

interface ISavingItem {
  accountName: string;
  accountTypeUniqueNo: string;
  subscriptionPeriod: number;
  minSubscriptionBalance: number;
  maxSubscriptionBalance: number;
  interestRate: number;
  rateDescription: string;
  bank: string;
}

interface DepositItemProps {
  item: IDepositItem;
}

interface SavingItemProps {
  item: ISavingItem;
}

export const AccountItemPage = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [depositItems, setDepositItems] = useState<IDepositItem[] | null>(null);
  const [savingItems, setSavingItems] = useState<ISavingItem[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    api.get('/api/accounts/deposit/products').then((response) => {
      setDepositItems(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('/api/accounts/saving/products').then((response) => {
      setSavingItems(response.data);
    });
  }, []);

  return (
    <>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        {'하..'}
      </Modal>
      <div className="flex items-center justify-center w-full h-auto tabletB:flex-col">
        <Mascot
          nickname="닉네임"
          ment="자신의 계좌를 확인해보세요!"
          classNameStyles="tablet:hidden"
        />
        <div className="bg-white flex flex-col items-center w-full mob:h-full mob:p-4 tablet:h-full tablet:p-6 desktop:rounded-2xl desktop:px-4 desktop:max-w-[48rem] desktop:h-[48rem]">
          <div className="flex flex-col w-full h-full content-around tabletB:max-w-[48rem]">
            <Typography
              size="6xl"
              weight="bold"
              color="dark"
              classNameStyles="mb-2"
            >
              상품 안내
            </Typography>
            <ToggleTab
              activeTab={activeTab}
              onTabChange={(index: number) => {
                setActiveTab(index);
              }}
              labels={['예금 상품', '적금 상품']}
              outlined={false}
              color="dark"
            />
            <div className="w-full h-full rounded-xl overflow-auto">
              <div className="flex flex-col justify-center mt-4 space-y-6">
                {activeTab === 0 ? (
                  <>
                    {depositItems?.map((item) => (
                      <DepositItem key={item.accountTypeUniqueNo} item={item} />
                    ))}
                  </>
                ) : (
                  <>
                    {savingItems?.map((item) => (
                      <SavingItem key={item.accountTypeUniqueNo} item={item} />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DepositItem = ({ item }: DepositItemProps) => {
  //todo
  const handleCreateDeposit = () => {};

  return (
    <div className="bg-secondary-200 p-4 rounded-lg shadow-lg w-full">
      <Typography color="primary" size="2xl" weight="bold">
        {item.accountName}
      </Typography>
      <Typography
        size="md"
        color="secondary"
        weight="semibold"
        classNameStyles="my-1"
      >
        {item.rateDescription}
      </Typography>

      <div className="flex space-x-2 mt-2 justify-between w-full">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <Typography color="dark" weight="semibold" classNameStyles="mr-4">
              예치기간 :
            </Typography>
            <Typography>{item.subscriptionPeriod / 30}</Typography>
            <Typography>개월</Typography>
          </div>
          <div className="flex flex-row">
            <Typography color="dark" weight="semibold" classNameStyles="mr-4">
              거치금액 :{' '}
            </Typography>
            <Typography>~{item.maxSubscriptionBalance / 10000}만원</Typography>
          </div>
        </div>
        <Button
          color="primary"
          size="md"
          classNameStyles="!px-8"
          onClick={handleCreateDeposit}
        >
          <Typography color="light" size="sm">
            개설
          </Typography>
        </Button>
      </div>
    </div>
  );
};

const SavingItem = ({ item }: SavingItemProps) => {
  //todo
  const handleCreateSaving = () => {};
  return (
    <div className="bg-secondary-200 p-4 rounded-lg shadow-lg w-full">
      <Typography color="primary" size="2xl" weight="bold">
        {item.accountName}
      </Typography>
      <Typography
        size="md"
        color="secondary"
        weight="semibold"
        classNameStyles="my-1"
      >
        {item.rateDescription}
      </Typography>

      <div className="flex space-x-2 mt-2 justify-between w-full">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <Typography color="dark" weight="semibold" classNameStyles="mr-4">
              예치기간 :{' '}
            </Typography>
            <Typography>{item.subscriptionPeriod / 30}</Typography>
            <Typography>개월</Typography>
          </div>
          <div className="flex flex-row">
            <Typography color="dark" weight="semibold" classNameStyles="mr-4">
              납입금액 :{' '}
            </Typography>
            <Typography>
              {item.minSubscriptionBalance / 10000}만원 ~
              {item.maxSubscriptionBalance / 10000}만원
            </Typography>
          </div>
        </div>
        <Button
          color="primary"
          size="md"
          classNameStyles="!px-8"
          onClick={handleCreateSaving}
        >
          <Typography color="light" size="lg">
            개설
          </Typography>
        </Button>
      </div>
    </div>
  );
};

const CreateDepositModal = () => {
  return (
    <>
      <TextField></TextField>
    </>
  );
};

import React, { useEffect, useState } from 'react';
import { Mascot } from '../../components/molecules/Mascot';
import { Typography } from '../../components/atoms/Typography';
import { ToggleTab } from '../../components/atoms/ToggleTab';
import { Button } from '../../components/atoms/Button';
import { api } from '../../apis/interceptors';
import { Modal } from '../../components/molecules/QuizModal';
import TextField from '../../components/atoms/TextField';
import { showToast } from '../../utils/toastUtil';

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
  handleModal: (item: IDepositItem) => void;
}

interface SavingItemProps {
  item: ISavingItem;
  handleModal: (item: ISavingItem) => void;
}

interface CreateDepositModalProps {
  item: IDepositItem | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CreateSavingModalProps {
  item: ISavingItem | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AccountItemPage = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [depositItems, setDepositItems] = useState<IDepositItem[] | null>(null);
  const [savingItems, setSavingItems] = useState<ISavingItem[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<IDepositItem | null>(null);

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

  const handleCreateModal = (item: IDepositItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  const handleSavingCreateModal = (item: ISavingItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} color="light" setIsOpen={setIsModalOpen}>
        {activeTab === 0 ? (
          <CreateDepositModal
            item={selectedItem}
            setIsModalOpen={setIsModalOpen}
          />
        ) : (
          <CreateSavingModal
            item={selectedItem}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </Modal>
      <div className="flex items-center justify-center w-full h-auto tabletB:flex-col">
        <Mascot
          nickname="규효니"
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
                      <DepositItem
                        key={item.accountTypeUniqueNo}
                        item={item}
                        handleModal={handleCreateModal}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {savingItems?.map((item) => (
                      <SavingItem
                        key={item.accountTypeUniqueNo}
                        item={item}
                        handleModal={handleSavingCreateModal}
                      />
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

const DepositItem = ({ item, handleModal }: DepositItemProps) => {
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
              가입기간 :
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
          onClick={() => handleModal(item)}
        >
          <Typography color="light" size="lg">
            개설
          </Typography>
        </Button>
      </div>
    </div>
  );
};

const SavingItem = ({ item, handleModal }: SavingItemProps) => {
  //todo
  const handleCreateSaving = () => {
    showToast('success', '상품가임이성공적으로 완료됐어요');
  };
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
              가입기간 :{' '}
            </Typography>
            <Typography>{item.subscriptionPeriod / 30}</Typography>
            <Typography>개월</Typography>
          </div>
          <div className="flex flex-row">
            <Typography color="dark" weight="semibold" classNameStyles="mr-4">
              월납입금액 :{' '}
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
          onClick={() => handleModal(item)}
        >
          <Typography color="light" size="lg">
            개설
          </Typography>
        </Button>
      </div>
    </div>
  );
};

const CreateDepositModal = ({
  item,
  setIsModalOpen,
}: CreateDepositModalProps) => {
  const [subscriptionPeriod, setSubscriptionPeriod] = useState<number | null>(
    null,
  );
  const [subscriptionBalance, setSubscriptionBalance] = useState<number | null>(
    null,
  );

  const [periodState, setPeriodState] = useState<'primary' | 'danger'>(
    'primary',
  );
  const [balanceState, setBalanceState] = useState<'primary' | 'danger'>(
    'primary',
  );

  const [periodError, setPeriodError] = useState<string>('');
  const [balanceError, setBalanceError] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // todo
  const submitCreateAccount = () => {
    showToast('success', '상풍가입이 성공적으로 완료되었어요');
    setIsModalOpen(false);
  };

  // 거치기간 변경 핸들러
  const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setSubscriptionPeriod(value);
    }
  };

  // 거치금액 변경 핸들러
  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setSubscriptionBalance(value);
    }
  };

  // 유효성 검사
  useEffect(() => {
    if (item) {
      // 거치기간 검사
      if (
        subscriptionPeriod &&
        subscriptionPeriod * 30 > item.subscriptionPeriod
      ) {
        setPeriodState('danger');
        setPeriodError(
          `가입기간은 최대 ${item.subscriptionPeriod / 30}개월까지 가능합니다.`,
        );
      } else {
        setPeriodState('primary');
        setPeriodError('');
      }

      // 거치금액 검사
      if (
        subscriptionBalance &&
        subscriptionBalance > item.maxSubscriptionBalance
      ) {
        setBalanceState('danger');
        setBalanceError(
          `거치금액은 최대 ${item.maxSubscriptionBalance / 10000}만원까지 가능합니다.`,
        );
      } else {
        setBalanceState('primary');
        setBalanceError('');
      }

      // 폼 유효성 검사
      if (
        subscriptionPeriod &&
        subscriptionBalance &&
        subscriptionPeriod <= item.subscriptionPeriod &&
        subscriptionBalance <= item.maxSubscriptionBalance
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }
  }, [subscriptionPeriod, subscriptionBalance, item]);

  return (
    <>
      <div></div>
      <div className="w-full bg-white">
        <Typography
          color="primary"
          weight="bold"
          size="6xl"
          classNameStyles="mb-8"
        >
          {item?.accountName}
        </Typography>
        <Typography
          size="xl"
          color="secondary"
          weight="semibold"
          classNameStyles="my-1"
        >
          {item?.rateDescription}
        </Typography>
        <div className="my-8">
          <div className="flex flex-row">
            <Typography
              color="dark"
              size="lg"
              weight="semibold"
              classNameStyles="mr-4"
            >
              가입기간 :
            </Typography>
            <Typography>{item ? item.subscriptionPeriod / 30 : 0}</Typography>
            <Typography>개월</Typography>
          </div>
          <div className="flex flex-row">
            <Typography
              color="dark"
              size="lg"
              weight="semibold"
              classNameStyles="mr-4"
            >
              거치금액 :{' '}
            </Typography>
            <Typography>
              ~{item ? item.maxSubscriptionBalance / 10000 : 0}만원
            </Typography>
          </div>
        </div>
        <div className="flex relative">
          <TextField
            state={balanceState}
            label="거치금액"
            size="xl"
            fullWidth={true}
            variant="standard"
            defaultValue={''}
            onChange={handleBalanceChange}
          />
          <div className="absolute right-0 top-3">
            <Typography color="secondary" size="lg">
              (원)
            </Typography>
          </div>
        </div>
        {balanceError && (
          <Typography color="danger" size="sm" classNameStyles="mt-2">
            {balanceError}
          </Typography>
        )}
        <div className="flex relative mt-8">
          <TextField
            label="거치기간"
            state={periodState}
            size="xl"
            fullWidth={true}
            variant="standard"
            defaultValue={''}
            onChange={handlePeriodChange}
          />
          <div className="absolute right-0 top-3">
            <Typography color="secondary" size="lg">
              (개월)
            </Typography>
          </div>
        </div>
        {periodError && (
          <Typography color="danger" size="sm" classNameStyles="mt-2">
            {periodError}
          </Typography>
        )}
        <div className="flex justify-center">
          <Button
            fullWidth={true}
            classNameStyles="mt-8"
            onClick={submitCreateAccount}
            disabled={!isFormValid} // 버튼 활성화 조건
          >
            계좌 개설하기
          </Button>
        </div>
      </div>
    </>
  );
};

const CreateSavingModal = ({
  item,
  setIsModalOpen,
}: CreateSavingModalProps) => {
  const [depositDay, setDepositDay] = useState<number | null>(null);
  const [subscriptionPeriod, setSubscriptionPeriod] = useState<number | null>(
    null,
  );
  const [monthlyDeposit, setMonthlyDeposit] = useState<number | null>(null);

  const [periodState, setPeriodState] = useState<'primary' | 'danger'>(
    'primary',
  );
  const [balanceState, setBalanceState] = useState<'primary' | 'danger'>(
    'primary',
  );
  const [dayState, setDayState] = useState<'primary' | 'danger'>('primary');

  const [periodError, setPeriodError] = useState<string>('');
  const [balanceError, setBalanceError] = useState<string>('');
  const [dayError, setDayError] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  //todo
  const submitCreateAccount = () => {
    setIsModalOpen(false);
    showToast('success', '상품가입이 성공적으로 완료되었어요');
  };

  // 가입기간 변경 핸들러
  const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setSubscriptionPeriod(value);
    }
  };

  // 매달 적금금액 변경 핸들러
  const handleMonthlyDepositChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setMonthlyDeposit(value);
    }
  };

  // 입금일 변경 핸들러
  const handleDepositDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setDepositDay(value);
    }
  };

  // 유효성 검사
  useEffect(() => {
    if (item) {
      // 가입기간 검사
      if (
        subscriptionPeriod &&
        subscriptionPeriod * 30 > item.subscriptionPeriod
      ) {
        setPeriodState('danger');
        setPeriodError(
          `가입기간은 최대 ${item.subscriptionPeriod / 30}개월까지 가능합니다.`,
        );
      } else {
        setPeriodState('primary');
        setPeriodError('');
      }

      // 매달 적금금액 검사
      if (
        monthlyDeposit &&
        (monthlyDeposit < item.minSubscriptionBalance ||
          monthlyDeposit > item.maxSubscriptionBalance)
      ) {
        setBalanceState('danger');
        setBalanceError(
          `적금금액은 ${item.minSubscriptionBalance / 10000}만원에서 ${item.maxSubscriptionBalance / 10000}만원 사이여야 합니다.`,
        );
      } else {
        setBalanceState('primary');
        setBalanceError('');
      }

      // 입금일 검사
      if (depositDay && (depositDay < 1 || depositDay > 31)) {
        setDayState('danger');
        setDayError('입금일은 1일부터 31일까지 가능합니다.');
      } else {
        setDayState('primary');
        setDayError('');
      }

      // 폼 유효성 검사
      if (
        subscriptionPeriod &&
        monthlyDeposit &&
        depositDay &&
        subscriptionPeriod <= item.subscriptionPeriod / 30 &&
        monthlyDeposit >= item.minSubscriptionBalance &&
        monthlyDeposit <= item.maxSubscriptionBalance &&
        depositDay >= 1 &&
        depositDay <= 28
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }
  }, [subscriptionPeriod, monthlyDeposit, depositDay, item]);

  return (
    <>
      <div></div>
      <div className="w-full bg-white">
        <Typography
          color="primary"
          weight="bold"
          size="6xl"
          classNameStyles="mb-8"
        >
          {item?.accountName}
        </Typography>
        <Typography
          size="xl"
          color="secondary"
          weight="semibold"
          classNameStyles="my-1"
        >
          {item?.rateDescription}
        </Typography>
        <div className="my-8">
          <div className="flex flex-row">
            <Typography
              color="dark"
              size="lg"
              weight="semibold"
              classNameStyles="mr-4"
            >
              가입기간 :
            </Typography>
            <Typography>{item ? item.subscriptionPeriod / 30 : 0}</Typography>
            <Typography>개월</Typography>
          </div>
          <div className="flex flex-row">
            <Typography
              color="dark"
              size="lg"
              weight="semibold"
              classNameStyles="mr-4"
            >
              적금금액 :{' '}
            </Typography>
            <Typography>
              {item ? item.minSubscriptionBalance / 10000 : 0} ~{' '}
              {item ? item.maxSubscriptionBalance / 10000 : 0} 만원
            </Typography>
          </div>
        </div>
        <div className="flex relative">
          <TextField
            state={balanceState}
            label="매달 적금금액"
            size="xl"
            fullWidth={true}
            variant="standard"
            defaultValue={''}
            onChange={handleMonthlyDepositChange}
          />
          <div className="absolute right-0 top-3">
            <Typography color="secondary" size="lg">
              (원)
            </Typography>
          </div>
        </div>
        {balanceError && (
          <Typography color="danger" size="sm" classNameStyles="mt-2">
            {balanceError}
          </Typography>
        )}
        <div className="flex relative mt-8">
          <TextField
            label="가입기간"
            state={periodState}
            size="xl"
            fullWidth={true}
            variant="standard"
            defaultValue={''}
            onChange={handlePeriodChange}
          />
          <div className="absolute right-0 top-3">
            <Typography color="secondary" size="lg">
              (개월)
            </Typography>
          </div>
        </div>
        {periodError && (
          <Typography color="danger" size="sm" classNameStyles="mt-2">
            {periodError}
          </Typography>
        )}
        <div className="flex relative mt-8">
          <TextField
            label="입금일"
            state={dayState}
            size="xl"
            fullWidth={true}
            variant="standard"
            defaultValue={''}
            onChange={handleDepositDayChange}
          />
          <div className="absolute right-0 top-3">
            <Typography color="secondary" size="lg">
              (일)
            </Typography>
          </div>
        </div>
        {dayError && (
          <Typography color="danger" size="sm" classNameStyles="mt-2">
            {dayError}
          </Typography>
        )}
        <div className="flex justify-center">
          <Button
            fullWidth={true}
            classNameStyles="mt-8"
            onClick={submitCreateAccount}
            disabled={!isFormValid} // 버튼 활성화 조건
          >
            계좌 개설하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateSavingModal;

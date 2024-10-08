import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/atoms/Button';
import { Typography } from '../../../components/atoms/Typography';
import { ProgressBar } from '../../../components/atoms/ProgressBar';
import { ToggleTab } from '../../../components/atoms/ToggleTab';
import { Mascot } from '../../../components/molecules/Mascot';
import { ChangeChild } from '../../../components/molecules/ChangeChild';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../apis/interceptors';
import TextField from '../../../components/atoms/TextField';
import { Modal } from '../../../components/molecules/QuizModal';
import { TColor } from '../../../themes/themeBase';
import { showToast } from '../../../utils/toastUtil';
import { IChild } from '../../../interfaces/userInterface';
import dayjs from 'dayjs';

interface DepositAccountCardProps {
  account: ICommonAccount | ISavingAccount | IDepositAccount | null;
  isOwn: boolean;
  handleSendMoney: (
    item: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => void;
  handleReservationSendModal: (
    item: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => void;
  handleAutoSendModal: (
    item: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => void;
  handleAccountLogModal: (
    item: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => void;
  handleDeleteAccountModal: (
    item: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => void;
}

interface InstallmentAccountCardProps {
  account: ICommonAccount | ISavingAccount | IDepositAccount | null;
  isOwn: boolean;
  percent: number;
  handleReservationSendModal: (
    item: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => void;
  handleAccountLogModal: (
    item: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => void;
  handleDeleteAccountModal: (
    item: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => void;
}

//수시입출금
export interface ICommonAccount {
  bankName: string;
  accountNo: string;
  accountName: string;
  accountType: string;
  accountExpiryDate: string;
  accountCreateDate: string;
  accountBalance: string;
}

//적금
export interface ISavingAccount {
  bankName: string;
  accountNo: string;
  accountName: string;
  accountType: string;
  accountExpiryDate: string;
  accountCreateDate: string;
  depositBalance: number;
  totalBalance: number;
  subscriptionPeriod: string;
  installmentNumber: string;
  savingRewardMoney: string;
}

//저축계좌
export interface IDepositAccount {
  bankName: string;
  accountNo: string;
  accountName: string;
  accountType: string;
  accountExpiryDate: string;
  accountCreatedDate: string;
  accountBalance: string;
  depositGoalMoney: string;
  depositRewardMoney: string;
}

export interface ITransaction {
  transactionDate: string;
  transactionTime: string;
  transactionType: string;
  transactionBalance: string;
  transactionAfterBalance: string;
  transactionSummary: string;
}

function formatString(input: string): string {
  const part1 = input.slice(0, 3);
  const part2 = input.slice(3, 8);
  const part3 = input.slice(8);

  return `${part1}-${part2}-${part3}`;
}

function formatTransactionDate(transactionDate: string) {
  return dayjs(transactionDate, 'YYYYMMDD').format('YYYY년 MM월 DD일');
}

// 시간을 포맷하는 함수
function formatTransactionTime(transactionTime: string) {
  return dayjs(transactionTime, 'HHmmss').format('HH:mm');
}
type TModal = 'SEND' | 'RESERVATION' | 'AUTO' | 'LOG' | 'DEL';

interface SendMoneyModalProps {
  account: ICommonAccount | ISavingAccount | IDepositAccount | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ReservationSendModalProps {
  account: ICommonAccount | ISavingAccount | IDepositAccount | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AutoSendModalProps {
  account: ICommonAccount | ISavingAccount | IDepositAccount | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TransactionItemProps {
  transaction: ITransaction;
}

interface AccountLogModalProps {
  account: ICommonAccount | ISavingAccount | IDepositAccount | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DeleteAccountModalProps {
  account: ICommonAccount | ISavingAccount | IDepositAccount | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function calculateSavingsProgress(accountInfo: ISavingAccount) {
  const { accountCreateDate, subscriptionPeriod } = accountInfo;

  // 현재 날짜를 가져옴
  const currentDate = dayjs();

  // 적금 시작 날짜를 dayjs 객체로 변환
  const startDate = dayjs(accountCreateDate, 'YYYYMMDD');

  // 현재 날짜와 시작 날짜 사이의 차이(개월 수)
  const monthsElapsed = currentDate.diff(startDate, 'month', true); // true 옵션은 소수점 단위까지 계산

  // 적금 진행률 계산 (소수점 두 자리까지)
  const progressPercentage = (
    (monthsElapsed / Number(subscriptionPeriod)) *
    100
  ).toFixed(2);

  return progressPercentage;
}

export const Account = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [ownAccounts, setOwnAccounts] = useState<
    (ICommonAccount | ISavingAccount | IDepositAccount)[] | null
  >(null);
  const [childrenList, setChildrenList] = useState<IChild[]>([]);
  const [selectedChild, setSelectedChild] = useState<number>(0);
  const [childAccounts, setChildAccounts] = useState<
    (ICommonAccount | ISavingAccount | IDepositAccount)[] | null
  >(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalTypes] = useState<TModal | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<
    ICommonAccount | ISavingAccount | IDepositAccount | null
  >(null);

  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/api/accounts`).then((response) => {
      setOwnAccounts(response.data);
      setChildAccounts(response.data);
    });
  }, []);

  const handleSendMoneyModal = (
    account: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => {
    setIsOpen(true);
    setModalTypes('SEND');
    setSelectedAccount(account);
  };

  const handleReservationSendModal = (
    account: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => {
    setIsOpen(true);
    setModalTypes('RESERVATION');
    setSelectedAccount(account);
  };

  const handleAutoSendModal = (
    account: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => {
    setIsOpen(true);
    setModalTypes('AUTO');
    setSelectedAccount(account);
  };

  const handleAccountLogModal = (
    account: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => {
    setIsOpen(true);
    setModalTypes('LOG');
    setSelectedAccount(account);
  };

  const handleDeleteAccountModal = (
    account: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => {
    setIsOpen(true);
    setModalTypes('DEL');
    setSelectedAccount(account);
  };

  const ReturnTypeModal = () => {
    switch (modalType) {
      case 'SEND':
        return (
          <SendMoneyModal account={selectedAccount} setIsOpen={setIsOpen} />
        );
      case 'RESERVATION':
        return (
          <ReservationSendModal
            account={selectedAccount}
            setIsOpen={setIsOpen}
          />
        );
      case 'AUTO':
        return (
          <AutoSendModal account={selectedAccount} setIsOpen={setIsOpen} />
        );
      case 'LOG':
        return (
          <AccountLogModal account={selectedAccount} setIsOpen={setIsOpen} />
        );
      case 'DEL':
        return (
          <DeleteAccountModal account={selectedAccount} setIsOpen={setIsOpen} />
        );
      default:
        return <div>오류발생</div>;
    }
  };

  return (
    <>
      <Modal color="light" isOpen={isOpen} setIsOpen={setIsOpen}>
        {ReturnTypeModal()}
      </Modal>
      <div className="flex items-center justify-center w-full h-auto tabletB:flex-col">
        <Mascot
          nickname="닉네임"
          ment="자신의 계좌를 확인해보세요!"
          classNameStyles={'tablet:hidden'}
        />
        <div className="bg-white flex flex-col items-center w-full mob:h-full mob:p-4 tablet:h-full tablet:p-6 desktop:rounded-2xl desktop:px-4 desktop:max-w-[48rem] desktop:h-[48rem]">
          <div className="flex flex-row w-full justify-between mt-4 tabletB:max-w-[48rem]">
            <Typography size="2xl" weight="bold" color="dark">
              계좌 관리
            </Typography>
            <ChangeChild
              childrenList={childrenList}
              setChildrenList={setChildrenList}
              selectedChild={selectedChild}
              setSelectedChild={setSelectedChild}
            />
          </div>
          <div className="w-full tabletB:max-w-[48rem]">
            <ToggleTab
              activeTab={activeTab}
              onTabChange={(index: number) => {
                setActiveTab(index);
              }}
              labels={['내 계좌', '내 자녀 계좌']}
              outlined={false}
              color="dark"
            ></ToggleTab>
          </div>

          <div className="space-y-5 mt-4 w-full max-w-[48rem] overflow-auto">
            {activeTab === 0 ? (
              <>
                {ownAccounts?.map((item) => {
                  if (item.accountType === '1' || item.accountType === '2') {
                    return (
                      <DepositAccountCard
                        key={item.accountNo}
                        account={item}
                        isOwn={true}
                        handleSendMoney={handleSendMoneyModal}
                        handleAutoSendModal={handleAutoSendModal}
                        handleReservationSendModal={handleReservationSendModal}
                        handleAccountLogModal={handleAccountLogModal}
                        handleDeleteAccountModal={handleDeleteAccountModal}
                      />
                    );
                  } else if (item.accountType === '3') {
                    return (
                      <InstallmentAccountCard
                        key={item.accountNo}
                        account={item}
                        percent={Number(
                          calculateSavingsProgress(item as ISavingAccount),
                        )}
                        isOwn={true}
                        handleReservationSendModal={handleReservationSendModal}
                        handleAccountLogModal={handleAccountLogModal}
                        handleDeleteAccountModal={handleDeleteAccountModal}
                      />
                    );
                  }
                })}
              </>
            ) : (
              <>
                {childAccounts?.map((item) => {
                  if (item.accountType === '1' || item.accountType === '2') {
                    return (
                      <DepositAccountCard
                        key={item.accountNo}
                        account={item}
                        isOwn={false}
                        handleSendMoney={handleSendMoneyModal}
                        handleReservationSendModal={handleReservationSendModal}
                        handleAutoSendModal={handleAutoSendModal}
                        handleAccountLogModal={handleAccountLogModal}
                        handleDeleteAccountModal={handleDeleteAccountModal}
                      />
                    );
                  } else if (item.accountType === '3') {
                    return (
                      <InstallmentAccountCard
                        key={item.accountNo}
                        account={item}
                        percent={Number(
                          calculateSavingsProgress(item as ISavingAccount),
                        )}
                        isOwn={false}
                        handleReservationSendModal={handleReservationSendModal}
                        handleAccountLogModal={handleAccountLogModal}
                        handleDeleteAccountModal={handleDeleteAccountModal}
                      />
                    );
                  }
                })}
              </>
            )}
            {ownAccounts && ownAccounts.length <= 3 && (
              <div className="flex justify-center">
                <Button
                  classNameStyles="mt-4"
                  onClick={() => {
                    navigate('./items');
                  }}
                >
                  계좌 개설하러가기
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const InstallmentAccountCard = ({
  account,
  percent,
  isOwn,
  handleReservationSendModal,
  handleAccountLogModal,
  handleDeleteAccountModal,
}: InstallmentAccountCardProps) => {
  return (
    <div className="bg-secondary-200 p-4 rounded-lg shadow-lg w-full">
      <Typography color="primary" size="2xl" weight="bold">
        {account?.accountName}
      </Typography>
      <Typography color="secondary" size="md" classNameStyles="mt-1 mb-2">
        {formatString(account ? account?.accountNo : '')}
      </Typography>
      <ProgressBar percent={percent} size="sm" classNameStyles="mt-2" />
      <Typography
        color="dark"
        size="3xl"
        weight="bold"
        classNameStyles="flex flex-row justify-end mt-2 text-end"
      >
        {Number((account as ISavingAccount)?.depositBalance).toLocaleString()}
        <Typography
          color="primary"
          size="3xl"
          weight="bold"
          classNameStyles="ml-1"
        >
          원
        </Typography>
      </Typography>

      <div className="flex space-x-2 mt-2 justify-end w-full">
        {!isOwn ? (
          <>
            <Button
              color="primary"
              size="sm"
              classNameStyles="!bg-primary-400"
              onClick={() => {
                handleReservationSendModal(account);
              }}
            >
              <Typography color="light" size="sm">
                예약이체 관리
              </Typography>
            </Button>
          </>
        ) : (
          <>
            <Button
              color="dark"
              size="sm"
              classNameStyles=""
              onClick={() => {
                handleAccountLogModal(account);
              }}
            >
              <Typography color="light" size="sm">
                내역 조회
              </Typography>
            </Button>

            <Button
              color="danger"
              size="sm"
              classNameStyles="!bg-danger-500"
              onClick={() => {
                handleDeleteAccountModal(account);
              }}
            >
              <Typography color="light" size="sm">
                해지
              </Typography>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export const DepositAccountCard = ({
  account,
  isOwn,
  handleSendMoney,
  handleAutoSendModal,
  handleAccountLogModal,
  handleDeleteAccountModal,
  handleReservationSendModal,
}: DepositAccountCardProps) => {
  return (
    <div className="bg-secondary-200 p-4 rounded-lg shadow-lg w-full">
      <Typography color="primary" size="2xl" weight="bold">
        {account?.accountName}
      </Typography>
      <Typography color="secondary">
        {account && formatString(account?.accountNo)}
      </Typography>
      <Typography
        color="dark"
        size="3xl"
        weight="bold"
        classNameStyles="flex flex-row justify-end mt-4 text-end"
      >
        {(
          account as ICommonAccount | IDepositAccount
        )?.accountBalance.toLocaleString()}
        <Typography
          color="primary"
          size="3xl"
          weight="bold"
          classNameStyles="ml-1"
        >
          원
        </Typography>
      </Typography>

      <div className="flex space-x-2 mt-4 justify-end">
        {isOwn && (
          <Button
            color="primary"
            size="sm"
            onClick={() => {
              handleSendMoney(account);
            }}
          >
            <Typography color="light" size="sm">
              송금
            </Typography>
          </Button>
        )}
        {!isOwn ? (
          account?.accountType === '1' ? (
            <>
              <Button
                color="primary"
                size="sm"
                classNameStyles="!bg-primary-400"
                onClick={() => {
                  handleAutoSendModal(account);
                }}
              >
                <Typography color="light" size="sm">
                  자동이체 관리
                </Typography>
              </Button>
            </>
          ) : (
            <>
              <Button
                color="primary"
                size="sm"
                classNameStyles="!bg-primary-400"
                onClick={() => {
                  handleReservationSendModal(account);
                }}
              >
                <Typography color="light" size="sm">
                  예약이체 관리
                </Typography>
              </Button>
            </>
          )
        ) : (
          <>
            <Button
              color="dark"
              size="sm"
              classNameStyles=""
              onClick={() => {
                handleAccountLogModal(account);
              }}
            >
              <Typography color="light" size="sm">
                내역 조회
              </Typography>
            </Button>
            {account?.accountType !== '1' && (
              <Button
                color="danger"
                size="sm"
                classNameStyles="!bg-danger-500"
                onClick={() => {
                  handleDeleteAccountModal(account);
                }}
              >
                <Typography color="light" size="sm">
                  해지
                </Typography>
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export const SendMoneyModal = ({ account, setIsOpen }: SendMoneyModalProps) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({ accountNumber: '', amount: '' });
  const [accountNumberState, setAccountNumberState] = useState<
    'primary' | 'danger'
  >('primary');
  const [amountState, setAmountState] = useState<'primary' | 'danger'>(
    'primary',
  );
  const [isFormValid, setIsFormValid] = useState(false);

  const validateAccountNumber = (value: string) => {
    if (value.length !== 16) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        accountNumber: '계좌번호는 16자리 숫자여야 합니다.',
      }));
      setAccountNumberState('danger');
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, accountNumber: '' }));
      setAccountNumberState('primary');
    }
  };

  const validateAmount = (value: string) => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue) || numericValue <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: '유효한 금액을 입력해주세요.',
      }));
      setAmountState('danger');
    } else if (
      account &&
      numericValue >
        Number((account as ICommonAccount | IDepositAccount).accountBalance)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: `송금 금액은 잔액(${(account as ICommonAccount | IDepositAccount).accountBalance.toLocaleString()}원) 이하이어야 합니다.`,
      }));
      setAmountState('danger');
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, amount: '' }));
      setAmountState('primary');
    }
  };

  useEffect(() => {
    const isValid =
      accountNumberState === 'primary' &&
      amountState === 'primary' &&
      accountNumber.length === 16 &&
      parseFloat(amount) > 0;

    setIsFormValid(isValid);
  }, [accountNumberState, amountState, accountNumber, amount]);

  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.replace(/\D/g, '');
    setAccountNumber(value);
    validateAccountNumber(value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setAmount(value);
    validateAmount(value);
  };

  return (
    <>
      <div className="w-full bg-white">
        <Typography
          color="primary"
          weight="bold"
          size="6xl"
          classNameStyles="mb-8"
        >
          송금하기
        </Typography>

        <div className="flex relative">
          <TextField
            label="계좌번호"
            size="xl"
            fullWidth={true}
            variant="standard"
            state={accountNumberState}
            onChange={handleAccountNumberChange}
          />
        </div>
        {errors.accountNumber && (
          <Typography color="danger" size="sm" classNameStyles="mt-2">
            {errors.accountNumber}
          </Typography>
        )}

        <div className="flex w-full relative mt-8">
          <TextField
            label="송금 금액"
            size="xl"
            fullWidth={true}
            variant="standard"
            state={amountState}
            onChange={handleAmountChange}
          />
          <div className="absolute right-0 top-3">
            <Typography color="secondary" size="lg">
              (원)
            </Typography>
          </div>
        </div>
        {errors.amount && (
          <Typography color="danger" size="sm" classNameStyles="mt-2">
            {errors.amount}
          </Typography>
        )}

        <div className="flex justify-center">
          <Button
            fullWidth={true}
            classNameStyles="mt-8"
            disabled={!isFormValid}
            onClick={() => {
              setIsOpen(false);
              showToast('success', '성공적으로 송금되었어요');
            }}
          >
            송금하기
          </Button>
        </div>
      </div>
    </>
  );
};

export const ReservationSendModal = ({
  account,
  setIsOpen,
}: ReservationSendModalProps) => {
  const [isAlreadyExisit, setIsAlreadyExist] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const [amountError, setAmountError] = useState<string>('');

  // 유효성 검사
  useEffect(() => {
    // 숫자만 입력되도록 체크
    if (!/^\d*$/.test(amount)) {
      setAmountError('숫자만 입력해주세요.');
    } else {
      setAmountError('');
    }
  }, [amount]);

  // 모든 필드가 유효한지 확인
  const isFormValid = amount && !amountError;

  return (
    <>
      <div className="w-full bg-white">
        <Typography
          color="primary"
          weight="bold"
          size="6xl"
          classNameStyles="mb-8"
        >
          예약이체 관리
        </Typography>

        <div className="flex relative">
          <TextField
            label="계좌번호"
            size="xl"
            fullWidth={true}
            state="unfocused"
            variant="standard"
            defaultValue={account?.accountNo}
            readonly={true}
            classNameStyles="text-secondary-200"
          />
        </div>

        <div className="flex w-full relative mt-8">
          <TextField
            label="만기시 이체 금액"
            size="xl"
            fullWidth={true}
            state={
              isAlreadyExisit ? 'unfocused' : amountError ? 'danger' : 'primary'
            }
            readonly={isAlreadyExisit}
            defaultValue={amount}
            variant="standard"
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="absolute right-0 top-3">
            <Typography color="secondary" size="lg">
              (원)
            </Typography>
          </div>
        </div>
        {/* 금액 에러 메시지 */}
        {amountError && (
          <div className="text-danger-500 text-sm mt-2 ml-3">{amountError}</div>
        )}

        <div className="flex justify-around">
          <Button
            size="lg"
            classNameStyles="mt-8"
            disabled={isAlreadyExisit || !isFormValid}
            onClick={() => {
              setIsOpen(false);
              showToast('success', '예약이체가 저장되었어요');
            }}
          >
            <Typography color="light" size="lg" weight="semibold">
              예약이체 설정
            </Typography>
          </Button>
          <Button
            size="lg"
            color="danger"
            disabled={!isAlreadyExisit}
            classNameStyles="mt-8"
            onClick={() => {
              setIsOpen(false);
              showToast('success', '예약이체가 삭제되었어요');
            }}
          >
            <Typography color="light" size="lg" weight="semibold">
              예약이체 삭제
            </Typography>
          </Button>
        </div>
      </div>
    </>
  );
};

export const AutoSendModal = ({ account, setIsOpen }: AutoSendModalProps) => {
  const [isAlreadyExisit, setIsAlreadyExist] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [amountError, setAmountError] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');

  // 유효성 검사
  useEffect(() => {
    // 숫자만 입력되도록 체크
    if (!/^\d*$/.test(amount)) {
      setAmountError('숫자만 입력해주세요.');
    } else {
      setAmountError('');
    }

    // 날짜가 1일부터 31일까지인지 체크
    const dateNum = parseInt(date, 10);
    if (date && (isNaN(dateNum) || dateNum < 1 || dateNum > 31)) {
      setDateError('1일부터 31일 사이의 날짜를 입력해주세요.');
    } else {
      setDateError('');
    }
  }, [amount, date]);

  // 모든 필드가 유효한지 확인
  const isFormValid = amount && date && !amountError && !dateError;

  return (
    <>
      <div className="w-full bg-white">
        <Typography
          color="primary"
          weight="bold"
          size="6xl"
          classNameStyles="mb-8"
        >
          자동이체 설정
        </Typography>

        <div className="flex relative">
          <TextField
            label="계좌번호"
            size="xl"
            fullWidth={true}
            state="unfocused"
            variant="standard"
            defaultValue={account?.accountNo}
            readonly={true}
            classNameStyles="text-secondary-200"
          />
        </div>

        <div className="flex w-full relative mt-8">
          <TextField
            label="매달 이체 금액"
            size="xl"
            fullWidth={true}
            state={isAlreadyExisit ? 'unfocused' : 'primary'}
            readonly={isAlreadyExisit}
            defaultValue={amount}
            variant="standard"
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="absolute right-0 top-3">
            <Typography color="secondary" size="lg">
              (원)
            </Typography>
          </div>
        </div>
        {/* 금액 에러 메시지 */}
        {amountError && (
          <div className="text-red-500 text-sm mt-2">{amountError}</div>
        )}

        <div className="flex w-full relative mt-8">
          <TextField
            label="매달 이체 날짜"
            size="xl"
            fullWidth={true}
            state={isAlreadyExisit ? 'unfocused' : 'primary'}
            readonly={isAlreadyExisit}
            defaultValue={date}
            variant="standard"
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="absolute right-0 top-3">
            <Typography color="secondary" size="lg">
              (일)
            </Typography>
          </div>
        </div>
        {/* 날짜 에러 메시지 */}
        {dateError && (
          <div className="text-red-500 text-sm mt-2">{dateError}</div>
        )}

        <div className="flex justify-around">
          <Button
            size="lg"
            classNameStyles="mt-8"
            disabled={isAlreadyExisit || !isFormValid}
            onClick={() => {
              setIsOpen(false);
              showToast('success', '자동이체가 저장되었어요');
            }}
          >
            <Typography color="light" size="lg" weight="semibold">
              자동이체 설정
            </Typography>
          </Button>
          <Button
            size="lg"
            color="danger"
            disabled={!isAlreadyExisit}
            classNameStyles="mt-8"
            onClick={() => {
              setIsOpen(false);
              showToast('success', '자동이체가 삭제되었어요');
            }}
          >
            <Typography color="light" size="lg" weight="semibold">
              자동이체 삭제
            </Typography>
          </Button>
        </div>
      </div>
    </>
  );
};

export const AccountLogModal = ({ account }: AccountLogModalProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const endDate = dayjs().format('YYYYMMDD'); // 오늘 날짜

  useEffect(() => {
    api
      .get(`/api/accounts/demand-deposit?startDate=19000101&endDate=${endDate}`)
      .then((res) => {
        setTransactions(res.data);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg w-full mb-8">
      {transactions.map((transaction, index) => (
        <TransactionItem key={index} transaction={transaction} />
      ))}
    </div>
  );
};

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  return (
    <div className="border-b border-gray-300 py-4">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <Typography color="secondary" classNameStyles="mr-2">
            {formatTransactionDate(transaction.transactionDate)}
          </Typography>
          <Typography color="dark">
            {formatTransactionTime(transaction.transactionTime)}
          </Typography>
        </div>
      </div>
      <p className="text-gray-900 text-lg mt-2">
        {transaction.transactionSummary}
      </p>
      <div className="flex justify-between items-center mt-2">
        {transaction.transactionType === '1' && (
          <Typography color="primary" weight="semibold">
            + ₩ {transaction.transactionBalance.toLocaleString()}
          </Typography>
        )}
        {transaction.transactionType === '2' && (
          <Typography color="danger" weight="semibold">
            - ₩ {transaction.transactionBalance.toLocaleString()}
          </Typography>
        )}
        <Typography color="secondary" classNameStyles="flex flex-row">
          잔액: ₩
          <Typography weight="semibold" classNameStyles="ml-2">
            {transaction.transactionAfterBalance.toLocaleString()}
          </Typography>
        </Typography>
      </div>
    </div>
  );
};

export const DeleteAccountModal = ({
  account,
  setIsOpen,
}: DeleteAccountModalProps) => {
  const handleDeleteAccount = () => {
    setIsOpen(false);
    showToast('success', '성공적으로 계좌가 삭제되었어요');
  };
  return (
    <div className="w-full bg-white">
      <div className="flex flex-col">
        <Typography
          color="primary"
          weight="bold"
          size="6xl"
          classNameStyles="mb-8"
        >
          계좌 해지
        </Typography>
      </div>
      <div className="flex flex-col items-center">
        <Typography
          size="6xl"
          color="danger"
          weight="semibold"
          classNameStyles="my-3 text-center"
        >
          정말로 {account?.accountName}을 <br></br> 해지하시겠어요?
        </Typography>

        <Typography
          size="xl"
          color="secondary"
          weight="semibold"
          classNameStyles="my-8 text-center"
        >
          계좌의 잔액은 모두 <br></br>수시입출금 통장으로 송금되어요!
        </Typography>
        <Button
          color="danger"
          fullWidth={true}
          classNameStyles="mt-8"
          onClick={handleDeleteAccount}
        >
          해지하기
        </Button>
      </div>
    </div>
  );
};

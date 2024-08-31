import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/atoms/Button';
import { Typography } from '../../../components/atoms/Typography';
import { ProgressBar } from '../../../components/atoms/ProgressBar';
import { Mascot } from '../../../components/molecules/Mascot';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../apis/interceptors';
import { Modal } from '../../../components/molecules/QuizModal';
import TextField from '../../../components/atoms/TextField';
import { showToast } from '../../../utils/toastUtil';
import dayjs from 'dayjs';

interface DepositAccountCardProps {
  account: ICommonAccount | ISavingAccount | IDepositAccount | null;
  handleSendMoney: (
    item: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => void;
  handleAccountLogModal: (
    item: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => void;
  handleDeleteAccountModal: (
    item: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InstallmentAccountCardProps {
  account: ICommonAccount | ISavingAccount | IDepositAccount | null;
  percent: number;
  handleAccountLogModal: (
    item: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => void;
  handleDeleteAccountModal: (
    item: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => void;
}

export interface ITransaction {
  transactionDate: string;
  transactionTime: string;
  transactionType: string;
  transactionBalance: string;
  transactionAfterBalance: string;
  transactionSummary: string;
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

type TModal = 'SEND' | 'RESERVATION' | 'AUTO' | 'LOG' | 'DEL';

interface SendMoneyModalProps {
  account: ICommonAccount | ISavingAccount | IDepositAccount | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TransactionItemProps {
  transaction: ITransaction;
}

interface AccountLogModalProps {
  account: ICommonAccount | ISavingAccount | IDepositAccount | null;
}

interface DeleteAccountModalProps {
  account: ICommonAccount | ISavingAccount | IDepositAccount | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function formatTransactionDate(transactionDate: string) {
  return dayjs(transactionDate, 'YYYYMMDD').format('YYYY년 MM월 DD일');
}
function formatTransactionTime(transactionTime: string) {
  return dayjs(transactionTime, 'HHmmss').format('HH:mm');
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

function formatString(input: string): string {
  const part1 = input.slice(0, 3);
  const part2 = input.slice(3, 8);
  const part3 = input.slice(8);

  return `${part1}-${part2}-${part3}`;
}
export const Account = () => {
  const [ownAccounts, setOwnAccounts] = useState<
    (ICommonAccount | ISavingAccount | IDepositAccount | null)[] | null
  >(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalTypes] = useState<TModal | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<
    ICommonAccount | ISavingAccount | IDepositAccount | null
  >(null);

  useEffect(() => {
    api.get(`/api/accounts`).then((response) => {
      setOwnAccounts(response.data);
    });
  }, []);

  const handleSendMoneyModal = (
    account: ICommonAccount | ISavingAccount | IDepositAccount | null,
  ) => {
    setIsOpen(true);
    setModalTypes('SEND');
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

  interface submitSendMoneyProps {
    amount: string;
    accountNumber: string;
    memo: string;
  }

  const submitSendMoney = ({
    amount,
    accountNumber,
    memo,
  }: submitSendMoneyProps) => {
    setIsOpen(false);
    api
      .post(`/api/accounts/transfer`, {
        transactionBalance: amount,
        depositAccountNo: accountNumber,
        transactionSummary: memo,
      })
      .then((response) => {
        showToast('success', '송금이 성공적으로 완료되었습니다.');
      })
      .catch((error: Error) => {});
  };

  const ReturnTypeModal = () => {
    switch (modalType) {
      case 'SEND':
        return (
          <SendMoneyModal account={selectedAccount} setIsOpen={setIsOpen} />
        );
      case 'LOG':
        return <AccountLogModal account={selectedAccount} />;
      case 'DEL':
        return (
          <DeleteAccountModal account={selectedAccount} setIsOpen={setIsOpen} />
        );
      default:
        return <div>오류발생</div>;
    }
  };

  const navigate = useNavigate();

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
          </div>

          <div className="space-y-5 mt-4 w-full max-w-[48rem] overflow-auto">
            {ownAccounts?.map((item) => {
              if (item?.accountType === '1' || item?.accountType === '2') {
                return (
                  <DepositAccountCard
                    key={item.accountNo}
                    account={item}
                    handleSendMoney={handleSendMoneyModal}
                    handleAccountLogModal={handleAccountLogModal}
                    handleDeleteAccountModal={handleDeleteAccountModal}
                    setIsOpen={setIsOpen}
                  />
                );
              } else if (item?.accountType === '3') {
                return (
                  <InstallmentAccountCard
                    key={item.accountNo}
                    account={item}
                    percent={Number(
                      calculateSavingsProgress(item as ISavingAccount),
                    )}
                    handleAccountLogModal={handleAccountLogModal}
                    handleDeleteAccountModal={handleDeleteAccountModal}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export const InstallmentAccountCard = ({
  account,
  percent,
  handleAccountLogModal,
  handleDeleteAccountModal,
}: InstallmentAccountCardProps) => {
  return (
    <div className="bg-secondary-200 p-4 rounded-lg shadow-lg w-full">
      <Typography color="primary" size="2xl" weight="bold">
        {account?.accountName}
      </Typography>
      <Typography color="secondary" size="md" classNameStyles="mt-1 mb-2">
        {account ? formatString(account?.accountNo) : ''}
      </Typography>
      <ProgressBar percent={percent} size="md" classNameStyles="mt-2" />
      <Typography
        color="dark"
        size="3xl"
        weight="bold"
        classNameStyles="flex flex-row justify-end mt-2 text-end"
      >
        {(account as ISavingAccount).depositBalance.toLocaleString()}
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
      </div>
    </div>
  );
};

export const DepositAccountCard = ({
  account,
  handleSendMoney,
  handleAccountLogModal,
  handleDeleteAccountModal,
  setIsOpen,
}: DepositAccountCardProps) => {
  return (
    <div className="bg-secondary-200 p-4 rounded-lg shadow-lg w-full">
      <Typography color="primary" size="2xl" weight="bold">
        {account?.accountName}
      </Typography>
      <Typography color="secondary">
        {account ? formatString(account?.accountNo) : ''}
      </Typography>
      <Typography
        color="dark"
        size="3xl"
        weight="bold"
        classNameStyles="flex flex-row justify-end mt-4 text-end"
      >
        {(
          account as ICommonAccount | IDepositAccount
        ).accountBalance.toLocaleString()}
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
      </div>
    </div>
  );
};

interface SendMoneyReqeust {
  transactionBalance: number;
  depositAccountNo: string;
  transactionSummary: string;
}

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
  const [memo, setMemo] = useState<string>('');

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
  const handlMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMemo(value);
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
      <div></div>
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

        <div className="flex w-full relative mt-8">
          <TextField
            label="메모"
            size="xl"
            fullWidth={true}
            variant="standard"
            onChange={handlMemoChange}
          />
        </div>

        <div className="flex justify-center">
          <Button
            fullWidth={true}
            classNameStyles="mt-8"
            disabled={!isFormValid}
            onClick={() => {
              setIsOpen(false);
              api
                .post(`/api/accounts/transfer`, {
                  transactionBalance: amount,
                  depositAccountNo: accountNumber,
                  transactionSummary: memo,
                })
                .then((response) => {
                  showToast('success', '송금이 성공적으로 완료되었습니다.');
                })
                .catch((error: Error) => {});
            }}
          >
            송금하기
          </Button>
        </div>
      </div>
    </>
  );
};

const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime);
  const formattedDate = `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일`;
  const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  return { formattedDate, formattedTime };
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
  const [imageUrl, setImageUrl] = useState<string>(
    'https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif',
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .post(`/api/children/accounts/deposit/recommanded`)
      .then((res) => {
        setImageUrl(res.data.imageUrl);
        setIsLoading(false);
      })
      .catch((error) => {
        showToast('error', '이미지를 불러오는데 실패했어요');
        setIsLoading(true);
      });
  }, []);

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
      <div className="flex justify-center">
        <img className="w-[90%]" src={imageUrl} />
      </div>
      <div className="flex flex-col items-center text-wrap">
        {!isLoading ? (
          <Typography
            color="dark"
            size="2xl"
            weight="semibold"
            classNameStyles="my-3 text-center"
          >
            해지하지 않고 기간을 끝까지 채우면 <br></br>
            <Typography color="primary" size="2xl" weight="semibold">
              이런 물건을 구매할 수 있어요!
            </Typography>
          </Typography>
        ) : (
          <Typography
            size="2xl"
            weight="bold"
            classNameStyles="my-4 text-center"
          >
            AI가 사진을 생성중입니다. <br></br> 잠시만 기다려주세요...!
          </Typography>
        )}

        {isLoading ? (
          <Button
            fullWidth={true}
            disabled={isLoading}
            classNameStyles="duration-0"
          >
            <Typography size="lg" color="light" weight="semibold">
              해지하기
            </Typography>
          </Button>
        ) : (
          <Button
            color="danger"
            fullWidth={true}
            classNameStyles="duration-200"
          >
            <Typography size="lg" color="light" weight="semibold">
              그래도 해지하기
            </Typography>
          </Button>
        )}
      </div>
    </div>
  );
};

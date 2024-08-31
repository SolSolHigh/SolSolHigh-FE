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

interface DepositAccountCardProps {
  account: IAccount;
  handleSendMoney: (item: IAccount) => void;
  handleAccountLogModal: (item: IAccount) => void;
  handleDeleteAccountModal: (item: IAccount) => void;
}

interface InstallmentAccountCardProps {
  account: IAccount;
  percent: number;
  handleAccountLogModal: (item: IAccount) => void;
  handleDeleteAccountModal: (item: IAccount) => void;
}

export interface ITransaction {
  dateTime: string;
  balance: number;
  transactionAfterBalance: number;
  memo: string;
}

export interface IAccount {
  bankName: string;
  accountNo: string;
  accountName: string;
  accountType: string;
  accountExpiryDate: string;
  accountCreateDate: string;
  accountBalance: string;
}

type TModal = 'SEND' | 'RESERVATION' | 'AUTO' | 'LOG' | 'DEL';

interface SendMoneyModalProps {
  account: IAccount | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TransactionItemProps {
  transaction: ITransaction;
}

interface AccountLogModalProps {
  account: IAccount | null;
}

interface DeleteAccountModalProps {
  account: IAccount | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function formatString(input: string): string {
  const part1 = input.slice(0, 3);
  const part2 = input.slice(3, 8);
  const part3 = input.slice(8);

  return `${part1}-${part2}-${part3}`;
}
export const Account = () => {
  const [ownAccounts, setOwnAccounts] = useState<IAccount[] | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalTypes] = useState<TModal | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<IAccount | null>(null);

  useEffect(() => {
    api.post(`/api/accounts`).then((response) => {
      setOwnAccounts(response.data);
    });
  }, []);

  const handleSendMoneyModal = (account: IAccount) => {
    setIsOpen(true);
    setModalTypes('SEND');
    setSelectedAccount(account);
  };

  const handleAccountLogModal = (account: IAccount) => {
    setIsOpen(true);
    setModalTypes('LOG');
    setSelectedAccount(account);
  };

  const handleDeleteAccountModal = (account: IAccount) => {
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
              if (item.accountType === '1' || item.accountType === '2') {
                return (
                  <DepositAccountCard
                    key={item.accountNo}
                    account={item}
                    handleSendMoney={handleSendMoneyModal}
                    handleAccountLogModal={handleAccountLogModal}
                    handleDeleteAccountModal={handleDeleteAccountModal}
                  />
                );
              } else if (item.accountType === '3') {
                return (
                  <InstallmentAccountCard
                    key={item.accountNo}
                    account={item}
                    percent={62.5}
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
        {account.accountName}
      </Typography>
      <Typography color="secondary" size="md" classNameStyles="mt-1 mb-2">
        {formatString(account.accountNo)}
      </Typography>
      <ProgressBar percent={percent} size="md" classNameStyles="mt-2" />
      <Typography
        color="dark"
        size="3xl"
        weight="bold"
        classNameStyles="flex flex-row justify-end mt-2 text-end"
      >
        {Number(account.accountBalance).toLocaleString()}
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
}: DepositAccountCardProps) => {
  return (
    <div className="bg-secondary-200 p-4 rounded-lg shadow-lg w-full">
      <Typography color="primary" size="2xl" weight="bold">
        {account.accountName}
      </Typography>
      <Typography color="secondary">
        {formatString(account.accountNo)}
      </Typography>
      <Typography
        color="dark"
        size="3xl"
        weight="bold"
        classNameStyles="flex flex-row justify-end mt-4 text-end"
      >
        {account.accountBalance.toLocaleString()}
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
        {account.accountType !== '1' && (
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
    } else if (account && numericValue > Number(account.accountBalance)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: `송금 금액은 잔액(${account.accountBalance.toLocaleString()}원) 이하이어야 합니다.`,
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
              // todo
            }}
          >
            송금하기
          </Button>
        </div>
      </div>
    </>
  );
};

const transactions: ITransaction[] = [
  {
    dateTime: '2024-04-01 10:24:52',
    balance: 10000,
    transactionAfterBalance: 86400,
    memo: '김다운 용돈 입금',
  },
  {
    dateTime: '2024-04-01 10:24:52',
    balance: 10000,
    transactionAfterBalance: 86400,
    memo: '김다운 용돈 입금',
  },
  {
    dateTime: '2024-04-01 10:24:52',
    balance: 10000,
    transactionAfterBalance: 86400,
    memo: '김다운 용돈 입금',
  },
  {
    dateTime: '2024-04-01 10:24:52',
    balance: 10000,
    transactionAfterBalance: 86400,
    memo: '김다운 용돈 입금',
  },
  {
    dateTime: '2024-04-01 10:24:52',
    balance: 10000,
    transactionAfterBalance: 86400,
    memo: '김다운 용돈 입금',
  },
  {
    dateTime: '2024-04-01 10:24:52',
    balance: 10000,
    transactionAfterBalance: 86400,
    memo: '김다운 용돈 입금',
  },
];

const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime);
  const formattedDate = `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일`;
  const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  return { formattedDate, formattedTime };
};

export const AccountLogModal = ({ account }: AccountLogModalProps) => {
  return (
    <div className="bg-white p-6 w-full rounded-lg mb-8">
      {transactions.map((transaction, index) => (
        <TransactionItem key={index} transaction={transaction} />
      ))}
    </div>
  );
};

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const { formattedDate, formattedTime } = formatDateTime(transaction.dateTime);

  return (
    <div className="border-b border-gray-300 py-4">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <Typography color="secondary" classNameStyles="mr-2">
            {formattedDate}
          </Typography>
          <Typography color="dark">{formattedTime}</Typography>
        </div>
      </div>
      <p className="text-gray-900 text-lg mt-2">{transaction.memo}</p>
      <div className="flex justify-between items-center mt-2">
        <Typography color="primary" weight="semibold">
          +₩{transaction.balance.toLocaleString()}
        </Typography>
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
      .get(`/api/children/account/deposit/remove-request-1`)
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

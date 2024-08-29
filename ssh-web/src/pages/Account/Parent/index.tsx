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

interface DepositAccountCardProps {
  accountName: string;
  accountNo: string;
  accountTypeCode: string;
  accountBalance: number;
  percent?: number;
  isOwn: boolean;
  handleSendMoney: () => void;
}

interface InstallmentAccountCardProps {
  accountName: string;
  accountNo: string;
  accountTypeCode: string;
  accountBalance: number;
  percent: number;
  isOwn: boolean;
}

interface IAccount {
  accountName: string;
  accountNo: string;
  accountTypeCode: string;
  accountBalance: number;
}

function formatString(input: string): string {
  const part1 = input.slice(0, 3);
  const part2 = input.slice(3, 8);
  const part3 = input.slice(8);

  // 각 부분을 '-'로 결합
  return `${part1}-${part2}-${part3}`;
}

export const Account = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [ownAccounts, setOwnAccounts] = useState<IAccount[] | null>(null);
  const [childAccounts, setChildAccounts] = useState<IAccount[] | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    api.post(`/api/accounts`).then((response) => {
      setOwnAccounts(response.data);
      setChildAccounts(response.data);
    });
  }, []);

  const handleSendMoneyModal = () => {
    setIsOpen(true);
  };

  const navigate = useNavigate();
  return (
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
          <ChangeChild />
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
                if (
                  item.accountTypeCode === '1' ||
                  item.accountTypeCode === '2'
                ) {
                  return (
                    <DepositAccountCard
                      key={item.accountNo}
                      accountName={item.accountName}
                      accountNo={item.accountNo}
                      accountTypeCode={item.accountTypeCode}
                      accountBalance={item.accountBalance}
                      percent={88.8}
                      isOwn={true}
                      handleSendMoney={handleSendMoneyModal}
                    />
                  );
                } else if (item.accountTypeCode === '3') {
                  return (
                    <InstallmentAccountCard
                      key={item.accountNo}
                      accountName={item.accountName}
                      accountNo={item.accountNo}
                      accountTypeCode={item.accountTypeCode}
                      accountBalance={item.accountBalance}
                      percent={62.5}
                      isOwn={true}
                    />
                  );
                }
              })}
            </>
          ) : (
            <>
              {childAccounts?.map((item) => {
                if (
                  item.accountTypeCode === '1' ||
                  item.accountTypeCode === '2'
                ) {
                  return (
                    <DepositAccountCard
                      key={item.accountNo}
                      accountName={item.accountName}
                      accountNo={item.accountNo}
                      accountTypeCode={item.accountTypeCode}
                      accountBalance={item.accountBalance}
                      percent={88.8}
                      isOwn={false}
                      handleSendMoney={handleSendMoneyModal}
                    />
                  );
                } else if (item.accountTypeCode === '3') {
                  return (
                    <InstallmentAccountCard
                      key={item.accountNo}
                      accountName={item.accountName}
                      accountNo={item.accountNo}
                      accountTypeCode={item.accountTypeCode}
                      accountBalance={item.accountBalance}
                      percent={62.5}
                      isOwn={false}
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
  );
};

export const InstallmentAccountCard = ({
  accountName,
  accountNo,
  accountTypeCode,
  accountBalance,
  percent,
  isOwn,
}: InstallmentAccountCardProps) => {
  return (
    <div className="bg-secondary-200 p-4 rounded-lg shadow-lg w-full">
      <Typography color="primary" size="2xl" weight="bold">
        {accountName}
      </Typography>
      <Typography color="secondary" size="md" classNameStyles="mt-1 mb-2">
        {formatString(accountNo)}
      </Typography>
      <ProgressBar percent={percent} size="sm" classNameStyles="mt-2" />
      <Typography
        color="dark"
        size="3xl"
        weight="bold"
        classNameStyles="flex flex-row justify-end mt-2 text-end"
      >
        {Number(accountBalance).toLocaleString()}
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
            <Button color="primary" size="sm" classNameStyles="!bg-primary-400">
              <Typography color="light" size="sm">
                예약송금 관리
              </Typography>
            </Button>
          </>
        ) : (
          <>
            <Button color="dark" size="sm" classNameStyles="">
              <Typography color="light" size="sm">
                내역 조회
              </Typography>
            </Button>
            <Button color="danger" size="sm" classNameStyles="!bg-danger-500">
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
  accountName,
  accountNo,
  accountTypeCode,
  accountBalance,
  percent = 0,
  isOwn,
  handleSendMoney,
}: DepositAccountCardProps) => {
  return (
    <div className="bg-secondary-200 p-4 rounded-lg shadow-lg w-full">
      <Typography color="primary" size="2xl" weight="bold">
        {accountName}
      </Typography>
      <Typography color="secondary">{formatString(accountNo)}</Typography>
      {accountTypeCode === '2' && (
        <ProgressBar percent={percent} size="sm" classNameStyles="mt-2" />
      )}
      <Typography
        color="dark"
        size="3xl"
        weight="bold"
        classNameStyles="flex flex-row justify-end mt-4 text-end"
      >
        {accountBalance.toLocaleString()}
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
        <>
          {accountTypeCode === '1' && (
            <Button
              color="primary"
              size="sm"
              onClick={() => {
                handleSendMoney();
              }}
            >
              <Typography color="light" size="sm">
                송금
              </Typography>
            </Button>
          )}
          {!isOwn ? (
            <>
              <Button
                color="primary"
                size="sm"
                classNameStyles="!bg-primary-400"
              >
                <Typography color="light" size="sm">
                  자동이체 관리
                </Typography>
              </Button>
            </>
          ) : (
            <>
              <Button color="dark" size="sm" classNameStyles="">
                <Typography color="light" size="sm">
                  내역 조회
                </Typography>
              </Button>
              <Button color="danger" size="sm" classNameStyles="!bg-danger-500">
                <Typography color="light" size="sm">
                  해지
                </Typography>
              </Button>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export const sendMoneyModal = () => {
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
            inputType="number"
            label="계좌번호"
            size="xl"
            fullWidth={true}
            variant="standard"
            defaultValue={''}
            onChange={() => {}}
          />
          <div className="absolute right-0 top-3">
            <Typography color="secondary" size="lg">
              (원)
            </Typography>
          </div>
        </div>
        <div className="flex relative mt-8">
          <TextField
            inputType="number"
            label="송금 금액"
            size="xl"
            fullWidth={true}
            variant="standard"
            defaultValue={''}
            onChange={() => {}}
          />
          <div className="absolute right-0 top-3">
            <Typography color="secondary" size="lg">
              (개월)
            </Typography>
          </div>
        </div>
        <div className="flex justify-center">
          <Button fullWidth={true} classNameStyles="mt-8" onClick={() => {}}>
            계좌 개설하기
          </Button>
        </div>
      </div>
    </>
  );
};

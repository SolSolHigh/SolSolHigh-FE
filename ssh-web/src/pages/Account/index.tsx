import React, { useState } from 'react';
import { Button } from '../../components/atoms/Button';
import { Typography } from '../../components/atoms/Typography';
import { ProgressBar } from '../../components/atoms/ProgressBar';
import { ToggleTab } from '../../components/atoms/ToggleTab';
import { Mascot } from '../../components/molecules/Mascot';
import { ChangeChild } from '../../components/molecules/ChangeChild';
import { useNavigate } from 'react-router-dom';

interface DepositAccountCardProps {
  accountName: string;
  accountNumber: string;
  balance: number;
  isOwn: boolean;
}

interface InstallmentAccountCardProps {
  accountName: string;
  accountNumber: string;
  balance: number;
  percent: number;
  isOwn: boolean;
}

export const Account = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [accountNum, setAccountNum] = useState<number>(0);

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

        <div className="space-y-5 mt-4 w-full max-w-[48rem]">
          {activeTab === 0 ? (
            <>
              <DepositAccountCard
                accountName={'쏠쏠 자유예금 통장'}
                accountNumber={'010-10101-101010'}
                balance={600500}
                isOwn={true}
              />
              <InstallmentAccountCard
                accountName={'쏠쏠 정기적금 통장'}
                accountNumber={'010-10101-101010'}
                balance={1200000}
                percent={62.5}
                isOwn={true}
              ></InstallmentAccountCard>
            </>
          ) : (
            <>
              <DepositAccountCard
                accountName={'쏠쏠 자유예금 통장'}
                accountNumber={'010-10101-101010'}
                balance={600500}
                isOwn={false}
              />
              <InstallmentAccountCard
                accountName={'쏠쏠 정기적금 통장'}
                accountNumber={'010-10101-101010'}
                balance={1200000}
                percent={62.5}
                isOwn={false}
              ></InstallmentAccountCard>
            </>
          )}
        </div>
        <Button
          classNameStyles="mt-4"
          onClick={() => {
            navigate('./items');
          }}
        >
          계좌 개설하러가기
        </Button>
      </div>
    </div>
  );
};

export const InstallmentAccountCard = ({
  accountName,
  accountNumber,
  balance,
  percent,
  isOwn,
}: InstallmentAccountCardProps) => {
  return (
    <div className="bg-secondary-200 p-4 rounded-lg shadow-lg w-full">
      <Typography color="primary" size="2xl" weight="bold">
        {accountName}
      </Typography>
      <Typography color="secondary">{accountNumber}</Typography>
      <ProgressBar percent={percent} size="sm" classNameStyles="mt-2" />
      <Typography
        color="dark"
        size="3xl"
        weight="bold"
        classNameStyles="flex flex-row justify-end mt-2 text-end"
      >
        {balance.toLocaleString()}
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
            <Button color="primary" size="sm">
              <Typography color="light" size="sm">
                송금
              </Typography>
            </Button>
            <Button color="primary" size="sm" classNameStyles="!bg-primary-400">
              <Typography color="light" size="sm">
                예약송금 관리
              </Typography>
            </Button>
            <Button color="dark" size="sm" classNameStyles="">
              <Typography color="light" size="sm">
                관리
              </Typography>
            </Button>
          </>
        ) : (
          <>
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
  accountNumber,
  balance,
  isOwn,
}: DepositAccountCardProps) => {
  return (
    <div className="bg-secondary-200 p-4 rounded-lg shadow-lg w-full">
      <Typography color="primary" size="2xl" weight="bold">
        {accountName}
      </Typography>
      <Typography color="secondary">{accountNumber}</Typography>
      <Typography
        color="dark"
        size="3xl"
        weight="bold"
        classNameStyles="flex flex-row justify-end mt-4 text-end"
      >
        {balance.toLocaleString()}
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
        {!isOwn ? (
          <>
            <Button color="primary" size="sm">
              <Typography color="light" size="sm">
                송금
              </Typography>
            </Button>
            <Button color="primary" size="sm" classNameStyles="!bg-primary-400">
              <Typography color="light" size="sm">
                자동이체 관리
              </Typography>
            </Button>
            <Button color="dark" size="sm" classNameStyles="">
              <Typography color="light" size="sm">
                관리
              </Typography>
            </Button>
          </>
        ) : (
          <>
            <Button color="primary" size="sm">
              <Typography color="light" size="sm">
                송금
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

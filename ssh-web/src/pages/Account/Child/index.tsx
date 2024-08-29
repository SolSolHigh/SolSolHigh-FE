import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/atoms/Button';
import { Typography } from '../../../components/atoms/Typography';
import { ProgressBar } from '../../../components/atoms/ProgressBar';
import { Mascot } from '../../../components/molecules/Mascot';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../apis/interceptors';

interface DepositAccountCardProps {
  accountName: string;
  accountNo: string;
  accountTypeCode: string;
  accountBalance: number;
  percent: number;
}

interface InstallmentAccountCardProps {
  accountName: string;
  accountNo: string;
  accountTypeCode: string;
  accountBalance: number;
  percent: number;
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
  const [ownAccounts, setOwnAccounts] = useState<IAccount[] | null>(null);

  useEffect(() => {
    api.post(`/api/accounts`).then((response) => {
      setOwnAccounts(response.data);
    });
  }, []);

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
        </div>
        <div className="w-full tabletB:max-w-[48rem]"></div>

        <div className="space-y-5 mt-4 w-full max-w-[48rem] overflow-auto">
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
                  />
                );
              }
            })}
          </>
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
        {accountTypeCode === '1' && (
          <Button color="primary" size="sm">
            <Typography color="light" size="sm">
              송금
            </Typography>
          </Button>
        )}
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
      </div>
    </div>
  );
};

import React from 'react';
import { Typography } from '../../../components/atoms/Typography';

interface ILastPriceInfoBarProps {
  lastPrice: number | null | undefined;
}

export const LastPriceInfoBar: React.FC<ILastPriceInfoBarProps> = ({
  lastPrice,
}) => {
  return (
    <div
      className={`w-full rounded-xl py-4 flex flex-row gap-1 text-center justify-center px-4 ${
        lastPrice !== null && lastPrice !== undefined
          ? 'bg-primary-100'
          : 'bg-secondary-200'
      }`}
    >
      {lastPrice !== null && lastPrice !== undefined ? (
        <>
          <Typography size="sm" color="dark" weight="bold">
            마지막으로 팔린 가격은
          </Typography>
          <Typography size="sm" color="primary" weight="bold">
            {`${lastPrice} 계란포인트`}
          </Typography>
          <Typography size="sm" color="dark" weight="bold">
            예요
          </Typography>
        </>
      ) : (
        <Typography size="sm" color="dark" weight="bold">
          거래된 적 없는 계란이에요
        </Typography>
      )}
    </div>
  );
};

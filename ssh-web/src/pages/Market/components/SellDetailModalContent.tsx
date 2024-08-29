import React, { useEffect, useState } from 'react';
import { Typography } from '../../../components/atoms/Typography';
import { CircularImage } from '../../../components/atoms/CircularImage';
import { PriceChart } from '../../Egg/components/PriceChart';
import {
  requestEggPurchase,
  deleteSpecialEggTrade,
} from '../../../apis/eggApi';
import { useSetRecoilState } from 'recoil';
import { isModalOpenState } from '../../../atoms/modal';
import { showToast } from '../../../utils/toastUtil';

interface SpecialEggDetailProps {
  eggName: string;
  eggImageUrl: string;
  eggPrice: number;
  timeAgo: string;
  isOwned: boolean;
  sellBoardId: number;
}

const fetchDummyData = (): { price: number; tradeDate: string }[] => {
  return [
    { price: 2, tradeDate: '2024-08-08' },
    { price: 3, tradeDate: '2024-08-23' },
    { price: 4, tradeDate: '2024-08-26' },
    { price: 1, tradeDate: '2024-08-28' },
  ];
};

export const SellDetailModalContent: React.FC<SpecialEggDetailProps> = ({
  eggName,
  eggImageUrl,
  eggPrice,
  timeAgo,
  isOwned,
  sellBoardId,
}) => {
  const [lastPrice, setLastPrice] = useState<number | null>(null);
  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  useEffect(() => {
    const tradeData = fetchDummyData();
    if (tradeData.length > 0) {
      const prices = tradeData.map((data) => data.price);
      setLastPrice(prices[prices.length - 1]);
    }
  }, []);

  const handlePurchase = async () => {
    try {
      await requestEggPurchase(sellBoardId, 1);
      showToast('success', '계란 구매에 성공했습니다!');
      setIsModalOpen({ isOpen: false, content: null });
    } catch (error) {
      console.error('계란 구매에 실패했습니다.', error);
      showToast('error', '계란 구매에 실패했습니다!');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSpecialEggTrade(sellBoardId);
      showToast('success', '계란 삭제에 성공했습니다!');
      setIsModalOpen({ isOpen: false, content: null });
    } catch (error) {
      console.error('계란 판매글 삭제에 실패했습니다.', error);
      showToast('error', '계란 판매글 삭제에 실패했습니다!');
    }
  };

  const tradeData = fetchDummyData();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full text-left">
        <Typography size="4xl" weight="bold" classNameStyles="mb-4">
          {eggName} 팔아요
        </Typography>
      </div>

      <div className="w-full h-24 flex flex-row items-center justify-between p-3 bg-primary-200 rounded-t-2xl">
        <div className="flex items-center gap-4 h-full">
          <CircularImage
            imageUrl={eggImageUrl}
            size="xl"
            altText="eggImg"
            bgColor="blue"
            imgWidth="60%"
          />
        </div>
        <div>
          <Typography size="2xl" weight="bold">
            {eggPrice} 계란포인트
          </Typography>
        </div>
        <div className="flex h-full items-end justify-end">
          <Typography size="sm" color="light">
            {timeAgo}
          </Typography>
        </div>
      </div>

      <div className="w-full h-48 bg-white rounded-lg shadow-lg flex items-center justify-center p-4">
        <PriceChart tradeData={tradeData} />
      </div>

      <div className="w-full bg-primary-200 rounded py-3 mt-4 flex flex-row gap-1 text-center justify-center px-1">
        <Typography size="md" color="dark" weight="semibold">
          이 계란이 마지막으로 팔린 가격은
        </Typography>
        <Typography size="md" color="primary" weight="semibold">
          {lastPrice !== null ? `${lastPrice} 계란포인트` : '정보 없음'}
        </Typography>
        <Typography size="md" color="dark" weight="semibold">
          예요
        </Typography>
      </div>

      {isOwned ? (
        <button
          className="w-full h-max py-4 bg-red-400 flex flex-row justify-center items-center gap-4 rounded-2xl mt-8 hover:bg-red-500 transition-all duration-300"
          onClick={handleDelete}
        >
          <Typography size="4xl" color="light" weight="bold">
            삭제하기
          </Typography>
        </button>
      ) : (
        <button
          className="w-full h-max py-4 bg-primary-400 flex flex-row justify-center items-center gap-4 rounded-2xl mt-8 hover:bg-primary-500 transition-all duration-300"
          onClick={handlePurchase}
        >
          <Typography size="4xl" color="light" weight="bold">
            구매하기
          </Typography>
        </button>
      )}
    </div>
  );
};

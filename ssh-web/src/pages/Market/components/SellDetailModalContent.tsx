import React, { useEffect, useState } from 'react';
import { Typography } from '../../../components/atoms/Typography';
import { CircularImage } from '../../../components/atoms/CircularImage';
import { PriceChart } from '../../Egg/components/PriceChart';
import {
  requestEggPurchase,
  deleteSpecialEggTrade,
  getSpecialEggTradeHistory,
  getMyRegisteredEggTrades,
} from '../../../apis/eggApi';
import { useSetRecoilState } from 'recoil';
import { isModalOpenState } from '../../../atoms/modal';
import { showToast } from '../../../utils/toastUtil';
import { LastPriceInfoBar } from './LastPriceInfoBar';
import {
  IPaginatedTrades,
  ISpecialEggTradeBoard,
  ISpecialEggTradeHistory,
} from '../../../interfaces/eggInterface';

interface SpecialEggDetailProps {
  eggId: number;
  eggName: string;
  eggImageUrl: string;
  eggPrice: number;
  timeAgo: string;
  isOwned: boolean;
  sellBoardId: number;
  onComplete: () => void;
  onCompleteBuy: () => void;
}

export const SellDetailModalContent: React.FC<SpecialEggDetailProps> = ({
  eggId,
  eggName,
  eggImageUrl,
  eggPrice,
  timeAgo,
  isOwned,
  sellBoardId,
  onComplete,
  onCompleteBuy,
}) => {
  const [lastPrice, setLastPrice] = useState<number | null>(null);
  const setIsModalOpen = useSetRecoilState(isModalOpenState);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tradeData, setTradeData] = useState<ISpecialEggTradeHistory[]>();
  const [mySellinEggData, setMySellinEggData] = useState<
    IPaginatedTrades['content']
  >([]);

  const [isMySellingBoard, setIsMySellingBoard] = useState<boolean>(false);

  useEffect(() => {
    const fetchSpecialEggHistory = async (specialEggId: number) => {
      try {
        const response = await getSpecialEggTradeHistory(specialEggId);
        console.log(response);
        setTradeData(response.data);
      } catch (error) {
        console.error('가격 로드 실패', error);
        showToast('error', '가격 로드 실패');
      }
    };
    fetchSpecialEggHistory(eggId);

    const checkIsMySellingBoard = async () => {
      const response = await getMyRegisteredEggTrades(0, 10);
      setMySellinEggData(response.data.content);
      console.log('sellBoardId:', sellBoardId);
      console.log('판매중인 계란데이터:', response.data.content);
      console.log('isMySellingBoard:', isMySellingBoard);

      mySellinEggData.map((sellingEggData: ISpecialEggTradeBoard) => {
        if (sellBoardId === sellingEggData.sellBoardId) {
          setIsMySellingBoard(true);
        }
      });
    };

    checkIsMySellingBoard();
  }, []);

  useEffect(() => {
    if (tradeData && tradeData?.length > 0) {
      const prices = tradeData?.map(
        (data: ISpecialEggTradeHistory) => data?.price,
      );
      setLastPrice(prices[prices.length - 1]);
    }
  }, [tradeData]);

  const handlePurchase = async () => {
    try {
      await requestEggPurchase(sellBoardId, 1);
      showToast('success', '계란 구매에 성공했습니다!');
      setIsModalOpen({ isOpen: false, content: null });
      onComplete();
      onCompleteBuy();
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
      onComplete();
    } catch (error) {
      console.error('계란 판매글 삭제에 실패했습니다.', error);
      showToast('error', '계란 판매글 삭제에 실패했습니다!');
    }
  };

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
        {tradeData?.length === 0 ? (
          <div className="w-full h-full p-4 flex flex-col justify-center items-center text-center">
            <Typography size="4xl" weight="bold">
              시장에서 팔린적 없는 계란이에요
            </Typography>
          </div>
        ) : (
          <PriceChart tradeData={tradeData} />
        )}
      </div>
      <div className="mt-4 w-full">
        <LastPriceInfoBar lastPrice={lastPrice} />
      </div>

      {isOwned || isMySellingBoard ? (
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

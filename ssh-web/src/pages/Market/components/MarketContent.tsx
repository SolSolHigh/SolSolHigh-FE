import React, { useState, useEffect } from 'react';
import { Typography } from '../../../components/atoms/Typography';
import { Button } from '../../../components/atoms/Button';
import { useSetRecoilState } from 'recoil';
import { isModalOpenState } from '../../../atoms/modal';
import TextField from '../../../components/atoms/TextField';
import { HiSearch } from 'react-icons/hi';
import { HiOutlinePlus } from 'react-icons/hi2';
import { EggCard } from '../../../components/molecules/EggCard';
import { SellEggModalContent } from './SellEggModal';
import {
  getMyRegisteredEggTrades,
  searchEggsForSale,
} from '../../../apis/eggApi';
import { IPaginatedTrades } from '../../../interfaces/eggInterface';

export const MarketContent = ({ activeTab }: { activeTab: number }) => {
  const CONTENT_LABELS = [
    '특별한 계란을 찾아보아요.',
    '내가 판매하고 있는 계란들이에요.',
  ];

  const [eggData, setEggData] = useState<IPaginatedTrades['content']>([]);
  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  const handleSellEggClick = (
    specialEggId: number,
    specialEggName: string,
    eggImageUrl: string,
  ) => {
    setIsModalOpen({
      isOpen: true,
      content: (
        <SellEggModalContent
          specialEggId={specialEggId}
          specialEggName={specialEggName}
          eggImageUrl={eggImageUrl}
        />
      ),
    });
  };

  const fetchEggData = async () => {
    try {
      if (activeTab === 0) {
        const response = await searchEggsForSale('', 'price,asc');
        setEggData(response.data.content);
      } else {
        const response = await getMyRegisteredEggTrades(0, 10);
        setEggData(response.data.content);
      }
    } catch (error) {
      console.error('계란 데이터 조회 실패', error);
    }
  };

  useEffect(() => {
    fetchEggData();
  }, [activeTab]);

  const formatTimeAgo = (dateString: string) => {
    const tradeDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - tradeDate.getTime()) / 1000,
    );

    const intervals: [number, string][] = [
      [60, '초'],
      [60, '분'],
      [24, '시간'],
      [30, '일'],
      [12, '달'],
      [Number.MAX_SAFE_INTEGER, '년'],
    ];

    let counter = diffInSeconds;

    for (const [interval, label] of intervals) {
      if (counter < interval) {
        return `${counter} ${label} 전`;
      }
      counter = Math.floor(counter / interval);
    }
    return '방금 전';
  };

  return (
    <div className="TAB-CONTENT bg-white rounded-t-3xl flex-1 pt-5 px-4 h-full">
      <Typography weight="bold" classNameStyles="mb-3">
        {CONTENT_LABELS[activeTab]}
      </Typography>
      <div className="relative EGGCARD-LIST flex flex-col gap-3 overflow-y-auto h-full max-h-[calc(70vh-4rem)] pb-[3rem]">
        <div className="sticky top-0 bg-white z-10 pb-4">
          {activeTab === 0 ? (
            <div className="flex flex-row w-full h-8 justify-start gap-4">
              <Button classNameStyles="!text-xs !h-9 animate-popIn">
                가격
              </Button>
              <div className="flex flex-row justify-end gap-3 flex-1 animate-popIn">
                <TextField
                  variant="standard"
                  label=""
                  size="sm"
                  fullWidth
                  classNameStyles=""
                />
                <Button classNameStyles="!text-xl !h-9 !bg-primary-400">
                  <HiSearch />
                </Button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => handleSellEggClick(1, '계란 이름', 'image-url')} // 예시 데이터로 변경
              className="w-full bg-primary-200 h-max py-6 flex flex-row items-center justify-center rounded-2xl gap-3 animate-popIn cursor-pointer"
            >
              <div className="bg-primary-100 px-3 py-3 rounded-full text-2xl text-primary-400">
                <HiOutlinePlus />
              </div>
              <Typography weight="semibold" color="light" size="xl">
                다른 계란도 팔아보아요
              </Typography>
            </div>
          )}
        </div>
        {eggData.map((egg) => (
          <EggCard
            key={egg.sellBoardId}
            eggName={egg.specialEggInfo.specialEggName}
            eggPrice={egg.pricePerOnce}
            eggImageUrl={egg.specialEggInfo.imageUrl}
            timeAgo={formatTimeAgo(egg.writtenAt)}
            isOwned={activeTab === 1}
            sellBoardId={egg.sellBoardId}
            onSellClick={() =>
              handleSellEggClick(
                egg.specialEggInfo.specialEggId,
                egg.specialEggInfo.specialEggName,
                egg.specialEggInfo.imageUrl,
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

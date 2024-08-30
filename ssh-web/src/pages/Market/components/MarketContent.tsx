import React, { ChangeEvent } from 'react';
import { Typography } from '../../../components/atoms/Typography';
import { Button } from '../../../components/atoms/Button';
import { useSetRecoilState } from 'recoil';
import { isModalOpenState } from '../../../atoms/modal';
import { HiSearch } from 'react-icons/hi';
import { HiOutlinePlus } from 'react-icons/hi2';
import { EggCardList } from './EggCardList';
import { SellEggModalContent } from './SellEggModal';
import { IPaginatedTrades } from '../../../interfaces/eggInterface';

interface MarketContentProps {
  activeTab: number;
  eggData: IPaginatedTrades['content'];
  searchTerm: string;
  sortOrder: 'asc' | 'desc';
  setSearchTerm: (value: string) => void;
  setSortOrder: (value: 'asc' | 'desc') => void;
  fetchEggData: () => void;
  onCompleteBuy: () => void;
}

export const MarketContent: React.FC<MarketContentProps> = ({
  activeTab,
  eggData,
  searchTerm,
  sortOrder,
  setSearchTerm,
  setSortOrder,
  fetchEggData,
  onCompleteBuy,
}) => {
  const CONTENT_LABELS = [
    '특별한 계란을 찾아보아요.',
    '내가 판매하고 있는 계란들이에요.',
  ];

  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  const handleSellEggContentOpen = () => {
    setIsModalOpen({
      isOpen: true,
      content: <SellEggModalContent onComplete={fetchEggData} />,
    });
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
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="!text-xs !h-9 animate-popIn"
              >
                <option value="asc">가격 낮은순</option>
                <option value="desc">가격 높은순</option>
              </select>
              <div className="flex flex-row justify-end gap-3 flex-1 animate-popIn">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full border-b-2 border-transparent focus:outline-none !border-primary-500 focus:border-primary-100 transition duration-300 ease-in-out"
                />
                <Button
                  classNameStyles="!text-xl !h-9 !bg-primary-400"
                  onClick={fetchEggData}
                >
                  <HiSearch />
                </Button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                handleSellEggContentOpen();
              }}
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
        <EggCardList
          eggData={eggData}
          isOwned={activeTab === 1}
          onComplete={fetchEggData}
          onCompleteBuy={onCompleteBuy}
        />
      </div>
    </div>
  );
};

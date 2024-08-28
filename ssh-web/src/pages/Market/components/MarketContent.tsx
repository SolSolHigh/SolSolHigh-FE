import React from 'react';
import { Typography } from '../../../components/atoms/Typography';

import { Button } from '../../../components/atoms/Button';
import { useSetRecoilState } from 'recoil';
import { isModalOpenState } from '../../../atoms/modal';
import TextField from '../../../components/atoms/TextField';
import { HiSearch } from 'react-icons/hi';
import { HiOutlinePlus } from 'react-icons/hi2';
import { EggCard } from '../../../components/molecules/EggCard';

import { SellEggModalContent } from './SellEggModal';

export const MarketContent = ({ activeTab }: { activeTab: number }) => {
  const CONTENT_LABELS = [
    '특별한 계란을 찾아보아요.',
    '내가 판매하고 있는 계란들이에요.',
  ];

  const eggData = [
    {
      eggName: '특별한 계란 1',
      eggPrice: 10,
      eggImageUrl: '/assets/images/samples/eggs/egg_1.png',
      timeAgo: '1분 전',
    },
    {
      eggName: '특별한 계란 2',
      eggPrice: 15,
      eggImageUrl: '/assets/images/samples/eggs/egg_2.png',
      timeAgo: '3분 전',
    },
    {
      eggName: '특별한 계란 3',
      eggPrice: 20,
      eggImageUrl: '/assets/images/samples/eggs/egg_3.png',
      timeAgo: '5분 전',
    },
  ];

  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  const handleSellEggClick = () => {
    setIsModalOpen({
      isOpen: true,
      content: <SellEggModalContent />,
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
            <div className="flex flex-row w-full h-8 justify-start gap-4 ">
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
              onClick={handleSellEggClick}
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
        {eggData.map((egg, index) => (
          <EggCard
            key={index}
            eggName={egg.eggName}
            eggPrice={egg.eggPrice}
            eggImageUrl={egg.eggImageUrl}
            timeAgo={egg.timeAgo}
          />
        ))}
      </div>
    </div>
  );
};

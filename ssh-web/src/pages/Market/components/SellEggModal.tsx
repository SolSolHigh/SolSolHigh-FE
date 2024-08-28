import React, { useState, useEffect } from 'react';
import { Typography } from '../../../components/atoms/Typography';
import { CircularImage } from '../../../components/atoms/CircularImage';
import { Button } from '../../../components/atoms/Button';
import {
  registerEggForSale,
  getLastSpecialEggPrice,
} from '../../../apis/eggApi';
import { useSetRecoilState } from 'recoil';
import { isModalOpenState } from '../../../atoms/modal';
import { NumberDial } from '../../../components/molecules/NumberDial';

interface SellEggModalContentProps {
  specialEggId: number;
  specialEggName: string;
  eggImageUrl: string;
}

export const SellEggModalContent: React.FC<SellEggModalContentProps> = ({
  specialEggId,
  specialEggName,
  eggImageUrl,
}) => {
  const [selectedPrice, setSelectedPrice] = useState<number>(3);
  const [sellCount, setSellCount] = useState<number>(1);
  const [lastPrice, setLastPrice] = useState<number | null>(null);
  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  const handlePriceChange = (newPrice: number) => {
    setSelectedPrice(newPrice);
  };

  const handleSellCountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSellCount(Number(event.target.value));
  };

  const fetchLastPrice = async () => {
    try {
      const response = await getLastSpecialEggPrice(specialEggId);
      setLastPrice(response.data.price);
    } catch (error) {
      console.error('마지막 거래 가격 조회에 실패했습니다.', error);
    }
  };

  useEffect(() => {
    fetchLastPrice();
  }, [specialEggId]);

  const handleSellEgg = async () => {
    try {
      await registerEggForSale(selectedPrice, sellCount, specialEggId);
      alert('계란 판매글이 등록되었습니다.');
      setIsModalOpen({ isOpen: false, content: null });
    } catch (error) {
      console.error('계란 판매글 등록에 실패했습니다.', error);
      alert('계란 판매글 등록에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-2">
      <div className="w-full">
        <Typography
          size="4xl"
          weight="bold"
          color="primary"
          classNameStyles="mb-1"
        >
          특별한 계란 팔기.
        </Typography>
        <Typography
          size="md"
          weight="semibold"
          classNameStyles="mb-4 !text-primary-300"
        >
          다른 친구들에게 계란포인트를 받고 팔아요
        </Typography>
      </div>
      <CircularImage
        imageUrl={eggImageUrl}
        size="2xl"
        imgWidth="70%"
        altText={specialEggName}
        classNameStyles="mb-6"
      />
      <Typography size="xl" weight="bold" color="dark" classNameStyles="mb-1">
        계란을 판매할 가격을 정해봐요
      </Typography>
      <Typography
        size="md"
        weight="semibold"
        classNameStyles="mb-4"
        color="secondary"
      >
        너무 비싸면 계란이 잘 팔리지 않을수도 있어요
      </Typography>
      <div className="w-full bg-primary-100 rounded-xl py-4  flex flex-row gap-1 text-center justify-center px-4">
        <Typography size="md" color="dark" weight="bold">
          시장에서 마지막으로 팔린 가격은
        </Typography>
        <Typography size="md" color="primary" weight="bold">
          {lastPrice !== null ? `${lastPrice} 계란포인트` : '정보 없음'}
        </Typography>
        <Typography size="md" color="dark" weight="bold">
          예요
        </Typography>
      </div>

      <div className="flex flex-col items-center justify-center my-6 w-full">
        <label htmlFor="sellCount" className="mb-2 text-secondary-500">
          몇 개를 팔까요?
        </label>
        <input
          type="number"
          id="sellCount"
          min="1"
          max="100"
          value={sellCount}
          onChange={handleSellCountChange}
          className="w-1/2 text-center p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex flex-col items-center justify-center mt-20 my-6 w-full">
        <NumberDial
          min={1}
          max={10}
          defaultNumber={selectedPrice}
          onChangeNumber={handlePriceChange}
          specialNumber={lastPrice || 3}
          specialMent="최근 거래된 가격"
          labels={Array.from({ length: 10 }, (_, i) => `${i + 1} 계란포인트`)}
        />
      </div>

      <Button
        classNameStyles="!w-full !py-7 !bg-primary-400 !text-white !rounded-2xl hover:!bg-primary-500 font-bold !text-xl mt-16"
        onClick={handleSellEgg}
      >
        판매글 등록하기
      </Button>
    </div>
  );
};

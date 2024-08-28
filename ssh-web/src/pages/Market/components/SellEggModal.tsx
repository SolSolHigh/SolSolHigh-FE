import React from 'react';
import { useState } from 'react';
import { Typography } from '../../../components/atoms/Typography';
import { CircularImage } from '../../../components/atoms/CircularImage';
import { NumberDial } from '../../../components/molecules/NumberDial';
import { Button } from '../../../components/atoms/Button';

export const SellEggModalContent: React.FC = () => {
  const [selectedPrice, setSelectedPrice] = useState<number>(3);

  const handlePriceChange = (newPrice: number) => {
    setSelectedPrice(newPrice);
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
        imageUrl="/assets/images/samples/eggs/egg_3.png"
        size="3xl"
        imgWidth="70%"
        altText="specialEgg"
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
          N 계란포인트
        </Typography>
        <Typography size="md" color="dark" weight="bold">
          예요
        </Typography>
      </div>

      <div className="flex flex-col items-center justify-center my-28 w-full">
        <NumberDial
          min={1}
          max={10}
          defaultNumber={selectedPrice}
          onChangeNumber={handlePriceChange}
          specialNumber={3}
          specialMent="최근 거래된 가격"
          labels={Array.from({ length: 10 }, (_, i) => `${i + 1} 계란포인트`)}
        />
      </div>
      <Button classNameStyles="!w-full !py-7 !bg-primary-400 !text-white !rounded-2xl hover:!bg-primary-500 font-bold !text-xl">
        판매글 등록하기
      </Button>
    </div>
  );
};

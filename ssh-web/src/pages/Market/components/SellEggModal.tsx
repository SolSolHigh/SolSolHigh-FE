import React, { useState, useEffect } from 'react';
import { Typography } from '../../../components/atoms/Typography';
import { Button } from '../../../components/atoms/Button';
import {
  registerEggForSale,
  getLastSpecialEggPrice,
  getOwnedSpecialEggs,
} from '../../../apis/eggApi';
import { useSetRecoilState } from 'recoil';
import { isModalOpenState } from '../../../atoms/modal';
import { NumberDial } from '../../../components/molecules/NumberDial';
import { ISpecialEggWithCount } from '../../../interfaces/eggInterface';
import { showToast } from '../../../utils/toastUtil';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { eggCardBgColors } from '../../Egg/components/MySpecialEggs';
import { Badge } from '../../../components/atoms/Badge';
import { LastPriceInfoBar } from './LastPriceInfoBar'; // import the new component

export const SellEggModalContent: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const [selectedPrice, setSelectedPrice] = useState<number>(3);
  const [sellCount, setSellCount] = useState<number>(1);
  const [lastPrice, setLastPrice] = useState<number | null>(null);
  const [ownedEggs, setOwnedEggs] = useState<ISpecialEggWithCount[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  const handlePriceChange = (newPrice: number) => {
    setSelectedPrice(newPrice);
  };

  const handleSellCountChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSellCount(Number(event.target.value));
  };

  const fetchLastPrice = async (eggId: number) => {
    try {
      const response = await getLastSpecialEggPrice(eggId);
      setLastPrice(response.data.price);
    } catch (error) {
      console.error('마지막 거래 가격 조회에 실패했습니다.', error);
      setLastPrice(null);
    }
  };

  const fetchOwnedSpecialEggs = async () => {
    try {
      const response = await getOwnedSpecialEggs();
      setOwnedEggs(response.data);
      if (response.data.length > 0) {
        await fetchLastPrice(response.data[0].specialEggInfo.specialEggId);
      }
    } catch (error) {
      showToast('error', `${error}`);
    }
  };

  const handleSlideChange = async (swiper: { realIndex: number }) => {
    setCurrentSlide(swiper.realIndex);
    const selectedEggId =
      ownedEggs[swiper.realIndex].specialEggInfo.specialEggId;
    await fetchLastPrice(selectedEggId);
  };

  useEffect(() => {
    fetchOwnedSpecialEggs();
  }, []);

  const handleSellEgg = async () => {
    try {
      const eggToSell = ownedEggs[currentSlide];
      await registerEggForSale(
        selectedPrice,
        sellCount,
        eggToSell.specialEggInfo.specialEggId,
      );
      showToast('success', '계란 판매글이 등록되었습니다.');
      onComplete();
      setIsModalOpen({ isOpen: false, content: null });
    } catch (error) {
      console.error(error);
      showToast('error', '계란 판매글 등록에 실패했습니다.');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center px-2">
      <div className="w-full">
        <Typography
          size="4xl"
          weight="bold"
          color="primary"
          classNameStyles="mb-1"
        >
          특별한 계란 팔기.
        </Typography>
      </div>
      <div>
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={false}
          slidesPerView={'auto'}
          spaceBetween={0}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 60,
            modifier: 5,
            slideShadows: false,
          }}
          onSlideChange={handleSlideChange}
          className="swiper w-full"
          style={{
            maxWidth: '100%',
          }}
        >
          {ownedEggs.map((egg, index) => (
            <SwiperSlide
              key={`${egg.specialEggInfo.specialEggId}-${index}`}
              className="flex items-center justify-center"
              style={{ maxWidth: '12rem' }}
            >
              <div
                className={`w-full flex flex-col items-center justify-center rounded-3xl py-2 px-4 ${
                  eggCardBgColors[index % eggCardBgColors.length]
                }`}
              >
                <img
                  src={egg.specialEggInfo.imageUrl}
                  alt={egg.specialEggInfo.specialEggName}
                  className="h-auto w-[5rem] rounded-md mb-4"
                />
                <div className="absolute bottom-14 right-6">
                  <Badge
                    text={`${egg.eggCount}개 보유중`}
                    classNameStyles={
                      egg.eggCount ? '!bg-primary-500' : '!bg-secondary-700'
                    }
                    size="sm"
                    weight="semibold"
                  />
                </div>
                <Typography
                  weight="bold"
                  color="light"
                  size="md"
                  classNameStyles="mb-2 w-full text-center"
                >
                  {egg.specialEggInfo.specialEggName}
                </Typography>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <LastPriceInfoBar lastPrice={lastPrice} />
      <div className="flex flex-row w-full justify-between bg-white z-10">
        <div className="flex flex-row items-center justify-start mt-1 gap-3">
          <Typography weight="bold" color="dark">
            몇 개를 팔까요?
          </Typography>

          <select
            value={sellCount}
            onChange={handleSellCountChange}
            className="p-2 border border-gray-300 rounded-lg"
          >
            {Array.from(
              { length: ownedEggs[currentSlide]?.eggCount || 1 },
              (_, i) => i + 1,
            ).map((count) => (
              <option key={count} value={count}>
                {count} 개
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-16 w-full ml-4">
        <NumberDial
          min={1}
          max={10}
          defaultNumber={selectedPrice}
          onChangeNumber={handlePriceChange}
          specialNumber={lastPrice || 3}
          visibleCount={3}
          specialMent="최근 거래된 가격"
          labels={Array.from({ length: 10 }, (_, i) => `${i + 1} 계란포인트`)}
        />
      </div>
      <Button
        classNameStyles="!w-full !py-7 !bg-primary-400 !text-white !rounded-2xl hover:!bg-primary-500 font-bold !text-xl mt-16 z-10"
        onClick={handleSellEgg}
      >
        판매글 등록하기
      </Button>
    </div>
  );
};

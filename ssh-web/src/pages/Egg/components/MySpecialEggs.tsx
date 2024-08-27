import React, { useState } from 'react';
import { Typography } from '../../../components/atoms/Typography';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper';

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

interface Egg {
  id: number;
  name: string;
  src: string;
}

export const MySpecialEggs: React.FC = () => {
  const EGG_POINT = 12;
  const bgColors = [
    'bg-pink-300 hover:bg-pink-400 transition-colors duration-300',
    'bg-blue-300 hover:bg-blue-400 transition-colors duration-300',
    'bg-green-300 hover:bg-green-400 transition-colors duration-300',
    'bg-yellow-300 hover:bg-yellow-400 transition-colors duration-300',
    'bg-purple-300 hover:bg-purple-400 transition-colors duration-300',
    'bg-orange-300 hover:bg-orange-400 transition-colors duration-300',
    'bg-gray-300 hover:bg-gray-400 transition-colors duration-300',
    'bg-red-300 hover:bg-red-400 transition-colors duration-300',
    'bg-teal-300 hover:bg-teal-400 transition-colors duration-300',
    'bg-indigo-300 hover:bg-indigo-400 transition-colors duration-300',
  ];

  const eggs: Egg[] = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `계란이름 ${index + 1}`,
    src: `/assets/images/samples/eggs/egg_${index + 1}.png`,
  }));

  const [currentSlide, setCurrentSlide] = useState(1);

  const handleSlideChange = (swiper: { realIndex: number }) => {
    setCurrentSlide(swiper.realIndex + 1);
  };

  return (
    <div className="TAB-CONTENT relative w-full h-full">
      <div className="w-full h-max py-4 bg-primary-200 flex flex-row justify-center items-center gap-2 rounded-3xl">
        <img src="/assets/images/egg_bucket.png" alt="" className="w-16" />
        <Typography
          size="7xl"
          classNameStyles="!text-primary-400"
          weight="bold"
        >
          {EGG_POINT}개
        </Typography>
        <Typography color="light" classNameStyles="mt-4">
          내가 가진 계란포인트에요
        </Typography>
      </div>

      <div className="mt-10">
        <div className="mb-4 text-right mr-2">
          <Typography
            size="2xl"
            weight="bold"
            classNameStyles="!text-primary-400"
          >
            {currentSlide} / {eggs.length}
          </Typography>
        </div>
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
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
          style={{ maxWidth: '100%' }}
        >
          {eggs.map((egg, index) => (
            <SwiperSlide
              key={egg.id}
              className="flex items-center justify-center"
              style={{ maxWidth: '230px' }}
            >
              <div
                className={`w-full flex flex-col items-center justify-center rounded-xl py-6 ${
                  bgColors[index % bgColors.length]
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <div
                    className="absolute w-[120px] h-[120px] rounded-full bg-gray-800 opacity-50 blur-lg"
                    style={{
                      transform: 'translate(12px, 15px)',
                    }}
                  ></div>

                  <img
                    src={egg.src}
                    alt={egg.name}
                    className="h-auto w-[100px] rounded-md mb-4 relative z-10"
                  />
                </div>
                <Typography
                  weight="bold"
                  color="light"
                  size="2xl"
                  classNameStyles="mb-2 w-3/4 text-left"
                >
                  {egg.name}
                </Typography>
                <button className="bg-white w-3/4 rounded-md shadow-md py-2">
                  자세히보기
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

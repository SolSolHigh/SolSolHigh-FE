import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { Typography } from '../../../components/atoms/Typography';
import { CircularImage } from '../../../components/atoms/CircularImage';

interface SpecialEggDetailProps {
  eggName: string;
  eggImageUrl: string;
  eggPrice: number;
  timeAgo: string;
}

const getRelativeDate = (dateString: string): string => {
  const tradeDate = new Date(dateString);
  const today = new Date();
  const diffTime = today.getTime() - tradeDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '오늘';
  if (diffDays === 1) return '1일 전';
  if (diffDays === 2) return '2일 전';

  return `${diffDays}일 전`;
};

interface TradeData {
  price: number;
  tradeDate: string;
}

export const SellDetailModalContent: React.FC<SpecialEggDetailProps> = ({
  eggName,
  eggImageUrl,
  eggPrice,
  timeAgo,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [lastPrice, setLastPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchDummyData = (): TradeData[] => {
      return [
        { price: 2, tradeDate: '2024-08-08' },
        { price: 3, tradeDate: '2024-08-23' },
        { price: 4, tradeDate: '2024-08-26' },
        { price: 1, tradeDate: '2024-08-28' },
      ];
    };

    const tradeData = fetchDummyData();

    if (tradeData.length > 0) {
      const sortedData = tradeData.sort((a, b) =>
        a.tradeDate > b.tradeDate ? 1 : -1,
      );

      // 상대적 날짜로 변환
      const labels = sortedData.map((data) => getRelativeDate(data.tradeDate));
      const prices = sortedData.map((data) => data.price);

      setLastPrice(prices[prices.length - 1]);

      if (chartRef.current) {
        const chartInstance = new Chart(chartRef.current, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: '가격 변화',
                data: prices,
                borderColor: '#4C7DFF',
                backgroundColor: 'rgba(76, 125, 255, 0.1)',
                pointBackgroundColor: '#4C7DFF',
                pointBorderColor: '#FFFFFF',
                pointHoverBackgroundColor: '#FF6384',
                pointHoverBorderColor: '#FFFFFF',
                pointRadius: 6,
                pointHoverRadius: 8,
                borderWidth: 3,
                tension: 0.3,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: '#4C7DFF',
                titleColor: '#FFFFFF',
                bodyColor: '#FFFFFF',
                displayColors: false,
                callbacks: {
                  label: function (context) {
                    return `${context.parsed.y} 계란포인트에 팔렸어요`;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: '#4C7DFF',
                  font: {
                    size: 14,
                    weight: 'bold',
                  },
                },
              },
              y: {
                grid: {
                  color: 'rgba(76, 125, 255, 0.2)',
                },
                ticks: {
                  color: '#4C7DFF',
                  font: {
                    size: 14,
                    weight: 'bold',
                  },
                  callback: function (value) {
                    return `${value}원`;
                  },
                },
              },
            },
          },
        });

        return () => {
          chartInstance.destroy();
        };
      }
    }
  }, []);

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
        <canvas ref={chartRef} className="w-full h-full"></canvas>
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
      <button className="w-full h-max py-4 bg-primary-400 flex flex-row justify-center items-center gap-4 rounded-2xl mt-8 hover:bg-primary-500 transition-all duration-300">
        <Typography size="4xl" color="light" weight="bold">
          구매하기
        </Typography>
      </button>
    </div>
  );
};

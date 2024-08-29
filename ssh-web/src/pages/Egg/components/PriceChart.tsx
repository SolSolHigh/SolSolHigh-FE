import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { formatTimeAgo } from '../../../utils/dateUtils';

interface ITradeData {
  price: number;
  tradeDate: string;
}

interface IPriceChartProps {
  tradeData: ITradeData[];
}

export const PriceChart: React.FC<IPriceChartProps> = ({ tradeData }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (tradeData.length > 0 && chartRef.current) {
      const sortedData = tradeData.sort((a, b) =>
        a.tradeDate > b.tradeDate ? 1 : -1,
      );

      const labels = sortedData.map((data) => formatTimeAgo(data.tradeDate));
      const prices = sortedData.map((data) => data.price);

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
  }, [tradeData]);

  return <canvas ref={chartRef} className="w-full h-full"></canvas>;
};

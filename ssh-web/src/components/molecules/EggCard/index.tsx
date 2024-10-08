import React from 'react';
import { Typography } from '../../atoms/Typography';
import { CircularImage } from '../../atoms/CircularImage';
import { eggCardStyles } from './EggCard.styles';
import { useSetRecoilState } from 'recoil';
import { isModalOpenState } from '../../../atoms/modal';
import { SellDetailModalContent } from '../../../pages/Market/components/SellDetailModalContent';

interface IEggCardProps {
  eggId: number;
  eggName: string;
  eggPrice: number;
  eggImageUrl: string;
  timeAgo: string;
  isOwned: boolean;
  sellBoardId: number;
  onComplete: () => void;
  onCompleteBuy: () => void;
}

export const EggCard: React.FC<IEggCardProps> = ({
  eggId,
  eggName,
  eggPrice,
  eggImageUrl,
  timeAgo,
  isOwned,
  sellBoardId,
  onComplete,
  onCompleteBuy,
}) => {
  const setModalState = useSetRecoilState(isModalOpenState);

  const handleCardClick = () => {
    setModalState({
      isOpen: true,
      content: (
        <SellDetailModalContent
          eggId={eggId}
          eggName={eggName}
          eggImageUrl={eggImageUrl}
          eggPrice={eggPrice}
          timeAgo={timeAgo}
          isOwned={isOwned}
          sellBoardId={sellBoardId}
          onComplete={onComplete}
          onCompleteBuy={onCompleteBuy}
        />
      ),
    });
  };

  return (
    <button className={eggCardStyles()} onClick={handleCardClick}>
      <div className="flex flex-row gap-4 items-center justify-center">
        <div className="flex items-center gap-4">
          <CircularImage
            imageUrl={eggImageUrl}
            size="lg"
            altText="eggImg"
            bgColor="blue"
            imgWidth="60%"
          />
        </div>
        <div className="flex flex-col items-start text-left gap-1">
          <div className="w-full flex flex-row gap-2">
            <Typography color="primary" size="lg" weight="bold">
              {eggName}
            </Typography>
            <Typography
              classNameStyles="!text-secondary-600"
              size="lg"
              weight="semibold"
            >
              팔아요
            </Typography>
          </div>
          <Typography
            classNameStyles="!text-secondary-500"
            size="md"
            weight="semibold"
          >
            {eggPrice} 계란포인트
          </Typography>
        </div>
      </div>
      <div className="flex justify-end gap-2 h-full items-end">
        <Typography size="sm" color="secondary" weight="regular">
          {timeAgo}
        </Typography>
      </div>
    </button>
  );
};

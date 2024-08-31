import React from 'react';
import { EggCard } from '../../../components/molecules/EggCard';
import { formatTimeAgo } from '../../../utils/dateUtils';
import { IPaginatedTrades } from '../../../interfaces/eggInterface';

interface IEggCardListProps {
  eggData: IPaginatedTrades['content'];
  isOwned: boolean;
  onComplete: () => void;
  onCompleteBuy: () => void;
}

export const EggCardList: React.FC<IEggCardListProps> = ({
  eggData,
  isOwned,
  onComplete,
  onCompleteBuy,
}) => {
  return (
    <>
      {eggData.map((egg) => (
        <EggCard
          key={egg.sellBoardId}
          eggId={egg.specialEggInfo.specialEggId}
          eggName={egg.specialEggInfo.specialEggName}
          eggPrice={egg.pricePerOnce}
          eggImageUrl={egg.specialEggInfo.imageUrl}
          timeAgo={formatTimeAgo(egg.writtenAt)}
          isOwned={isOwned}
          sellBoardId={egg.sellBoardId}
          onComplete={onComplete}
          onCompleteBuy={onCompleteBuy}
        />
      ))}
    </>
  );
};

import React from 'react';
import { EggCard } from '../../../components/molecules/EggCard';
import { formatTimeAgo } from '../../../utils/dateUtils';
import { IPaginatedTrades } from '../../../interfaces/eggInterface';

interface IEggCardListProps {
  eggData: IPaginatedTrades['content'];
  isOwned: boolean;
}

export const EggCardList: React.FC<IEggCardListProps> = ({
  eggData,
  isOwned,
}) => {
  return (
    <>
      {eggData.map((egg) => (
        <EggCard
          key={egg.sellBoardId}
          eggName={egg.specialEggInfo.specialEggName}
          eggPrice={egg.pricePerOnce}
          eggImageUrl={egg.specialEggInfo.imageUrl}
          timeAgo={formatTimeAgo(egg.writtenAt)}
          isOwned={isOwned}
          sellBoardId={egg.sellBoardId}
        />
      ))}
    </>
  );
};

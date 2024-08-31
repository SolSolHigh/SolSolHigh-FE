import React, { useState, useEffect, useCallback } from 'react';
import { EResize } from '../../themes/themeBase';
import { Mascot } from '../../components/molecules/Mascot';
import { Typography } from '../../components/atoms/Typography';
import { ToggleTab } from '../../components/atoms/ToggleTab';
import { resizeState } from '../../atoms/resize';
import { useRecoilValue } from 'recoil';
import { Modal } from '../../components/molecules/Modal';
import {
  containerStyles,
  mascotWrapperStyles,
  titleBoxStyles,
  contentStyles,
  missionListBoxStyles,
} from './MarketFetch.styles';

import { MarketContent } from './components/MarketContent';
import {
  getEggCount,
  searchEggsForSale,
  getMyRegisteredEggTrades,
} from '../../apis/eggApi';
import { IPaginatedTrades } from '../../interfaces/eggInterface';

export const MarketFetch = () => {
  const size = useRecoilValue(resizeState);

  const [activeTab, setActiveTab] = useState<number>(0);
  const [eggPoints, setEggPoints] = useState<number>(0);
  const [eggData, setEggData] = useState<IPaginatedTrades['content']>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const TOGGLE_LABELS = ['계란 시장 구경', '내가 판매중인 계란 구경'];

  const handleTabChange = () => {
    setActiveTab(activeTab ? 0 : 1);
  };

  const fetchEggPoint = async () => {
    try {
      const response = await getEggCount();
      setEggPoints(response.data.count);
    } catch (error) {
      console.error('계란 재화 조회 실패', error);
    }
  };

  const fetchEggData = useCallback(async () => {
    try {
      if (activeTab === 0) {
        const response = await searchEggsForSale(
          searchTerm,
          `eggPricePerOnce,${sortOrder}`,
        );
        setEggData(response.data.content);
      } else {
        const response = await getMyRegisteredEggTrades(0, 10);
        setEggData(response.data.content);
      }
    } catch (error) {
      console.error('계란 데이터 조회 실패', error);
    }
  }, [activeTab, searchTerm, sortOrder]);

  useEffect(() => {
    fetchEggData();
  }, [activeTab, fetchEggData]);

  useEffect(() => {
    const fetchEggPoint = async () => {
      try {
        const response = await getEggCount();
        setEggPoints(response.data.count);
      } catch (error) {
        console.error('계란 재화 조회 실패', error);
      }
    };

    fetchEggPoint();
  }, []);

  return (
    <div className={containerStyles()}>
      {size === EResize.D && (
        <div className={mascotWrapperStyles()}>
          <Mascot
            nickname="닉네임"
            ment="여기서 오늘의 계란을 깨서 저금해보세요!"
          />
        </div>
      )}

      <div className={contentStyles()}>
        <div className={titleBoxStyles()}>
          <div className="w-full flex flex-row justify-between">
            <Typography size="4xl" color="dark" weight="semibold">
              계란 시장
            </Typography>
            <div className="h-auto w-max flex flex-row items-center gap-2 bg-white py-1 px-3 rounded-xl">
              <img src="/assets/images/egg_bucket.png" alt="" className="h-8" />
              <Typography
                size="md"
                weight="semibold"
                classNameStyles="!text-primary-400"
              >
                {eggPoints}개
              </Typography>
            </div>
          </div>
          <ToggleTab
            activeTab={activeTab}
            onTabChange={handleTabChange}
            labels={TOGGLE_LABELS}
          />
        </div>
        <div className={missionListBoxStyles()}>
          <MarketContent
            activeTab={activeTab}
            eggData={eggData}
            searchTerm={searchTerm}
            sortOrder={sortOrder}
            setSearchTerm={setSearchTerm}
            setSortOrder={setSortOrder}
            fetchEggData={fetchEggData}
            onCompleteBuy={fetchEggPoint}
          />
        </div>
        <Modal color="light" />
      </div>
    </div>
  );
};

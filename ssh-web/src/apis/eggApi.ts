import { AxiosResponse } from 'axios';
import {
  ISpecialEggTradeHistory,
  ISpecialEggWithCount,
  ICurrentEggStatus,
  IEggCount,
  ISpecialEggLastTradePrice,
  IPaginatedTrades,
  ISpecialEggReward,
} from '../interfaces/eggInterface';
import { api } from './interceptors';

export const getSpecialEggTradeHistory = (
  specialEggId: number,
): Promise<AxiosResponse<ISpecialEggTradeHistory[]>> => {
  return api.get(`/api/market/special-eggs/${specialEggId}`);
};

export const deleteSpecialEggTrade = (
  sellBoardId: number,
): Promise<AxiosResponse<void>> => {
  return api.patch(`/api/market/trades/${sellBoardId}`);
};

export const requestEggPurchase = (
  sellBoardId: number,
  eggCount: number,
): Promise<AxiosResponse<void>> => {
  return api.post('/api/market/trades/buy-request', {
    sellBoardId,
    eggCount,
  });
};

export const getEggCount = (): Promise<AxiosResponse<IEggCount>> => {
  return api.get('/api/eggs/count');
};

export const registerEggForSale = (
  pricePerOnce: number,
  sellCount: number,
  specialEggId: number,
): Promise<AxiosResponse<void>> => {
  return api.post('/api/market/trades', {
    pricePerOnce,
    sellCount,
    specialEggId,
  });
};

export const getMyRegisteredEggTrades = (
  page: number,
  size: number,
): Promise<AxiosResponse<IPaginatedTrades>> => {
  return api.get('/api/market/trades', {
    params: { page, size },
  });
};

export const getLastSpecialEggPrice = (
  specialEggId: number,
): Promise<AxiosResponse<ISpecialEggLastTradePrice>> => {
  return api.get(`/api/market/special-eggs/${specialEggId}/price`);
};

export const getOwnedSpecialEggs = (): Promise<
  AxiosResponse<ISpecialEggWithCount[]>
> => {
  return api.get('/api/children/special-eggs');
};

export const searchEggsForSale = (
  name: string,
  sort: string,
): Promise<AxiosResponse<IPaginatedTrades>> => {
  return api.get('/api/market/trades/search', {
    params: { name, sort },
  });
};

export const getCurrentEggStatus = (): Promise<
  AxiosResponse<ICurrentEggStatus>
> => {
  return api.get('/api/eggs/now');
};

// 현재 계란 상태 변경
export const updateCurrentEggStatus = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hitCount: number,
): Promise<AxiosResponse<ISpecialEggReward | null>> => {
  return api.patch('/api/eggs/now', { hitCount: 1 }); // 항상 1을 보냄
};

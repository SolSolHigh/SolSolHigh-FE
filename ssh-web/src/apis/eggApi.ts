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

// 특별한 계란 거래 히스토리 조회
export const getSpecialEggTradeHistory = async (
  specialEggId: number,
): Promise<AxiosResponse<ISpecialEggTradeHistory[]>> => {
  try {
    const response = await api.get(`/api/market/special-eggs/${specialEggId}`);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('특별한 계란 거래 히스토리 조회에 실패했습니다.');
  }
};

// 특별한 계란 거래 삭제
export const deleteSpecialEggTrade = async (
  sellBoardId: number,
): Promise<AxiosResponse<void>> => {
  try {
    const response = await api.patch(`/api/market/trades/${sellBoardId}`);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('특별한 계란 거래 삭제에 실패했습니다.');
  }
};

// 계란 구매 요청
export const requestEggPurchase = async (
  sellBoardId: number,
  eggCount: number,
): Promise<AxiosResponse<void>> => {
  try {
    const response = await api.post('/api/market/trades/buy-request', {
      sellBoardId,
      eggCount,
    });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('계란 구매 요청에 실패했습니다.');
  }
};

// 계란 재화 조회
export const getEggCount = async (): Promise<AxiosResponse<IEggCount>> => {
  try {
    const response = await api.get('/api/eggs/count');
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('계란 재화 조회에 실패했습니다.');
  }
};

// 계란 판매 등록
export const registerEggForSale = async (
  pricePerOnce: number,
  sellCount: number,
  specialEggId: number,
): Promise<AxiosResponse<void>> => {
  try {
    const response = await api.post('/api/market/trades', {
      pricePerOnce,
      sellCount,
      specialEggId,
    });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('계란 판매 등록에 실패했습니다.');
  }
};

// 내가 등록한 계란 거래 조회
export const getMyRegisteredEggTrades = async (
  page: number,
  size: number,
): Promise<AxiosResponse<IPaginatedTrades>> => {
  try {
    const response = await api.get('/api/market/trades', {
      params: { page, size },
    });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('내가 등록한 계란 거래 조회에 실패했습니다.');
  }
};

// 마지막 계란 거래 가격 조회
export const getLastSpecialEggPrice = async (
  specialEggId: number,
): Promise<AxiosResponse<ISpecialEggLastTradePrice>> => {
  try {
    const response = await api.get(
      `/api/market/special-eggs/${specialEggId}/price`,
    );
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('마지막 계란 거래 가격 조회에 실패했습니다.');
  }
};

// 소유한 특별 계란 조회
export const getOwnedSpecialEggs = async (): Promise<
  AxiosResponse<ISpecialEggWithCount[]>
> => {
  try {
    const response = await api.get('/api/children/special-eggs');
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('소유한 특별 계란 조회에 실패했습니다.');
  }
};

// 판매 중인 계란 검색
export const searchEggsForSale = async (
  name: string,
  sort: string,
): Promise<AxiosResponse<IPaginatedTrades>> => {
  try {
    const response = await api.get('/api/market/trades/search', {
      params: { name, sort },
    });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('판매 중인 계란 검색에 실패했습니다.');
  }
};

// 현재 계란 상태 조회
export const getCurrentEggStatus = async (): Promise<
  AxiosResponse<ICurrentEggStatus>
> => {
  try {
    const response = await api.get('/api/eggs/now');
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('현재 계란 상태 조회에 실패했습니다.');
  }
};

// 현재 계란 상태 변경
export const updateCurrentEggStatus = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hitCount: number,
): Promise<AxiosResponse<ISpecialEggReward | null>> => {
  try {
    const response = await api.patch('/api/eggs/now', { hitCount: 1 }); // 항상 1을 보냄
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('계란 상태 변경에 실패했습니다.');
  }
};

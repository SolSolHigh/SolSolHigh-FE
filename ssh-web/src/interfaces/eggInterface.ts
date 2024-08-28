export interface ISpecialEggTradeHistory {
  price: number;
  tradeDate: string;
}

export interface ISpecialEggInfo {
  specialEggId: number;
  specialEggName: string;
  imageUrl: string;
}

export interface ISpecialEggWithCount {
  specialEggInfo: ISpecialEggInfo;
  eggCount: number;
}

export interface ISpecialEggTradeBoard {
  sellBoardId: number;
  writtenAt: string;
  pricePerOnce: number;
  sellCount: number;
  specialEggInfo: ISpecialEggInfo;
}

export interface ICurrentEggStatus {
  needHitCount: number;
  todayDestroyCount: number;
}

export interface IEggCount {
  count: number;
}

export interface ISpecialEggLastTradePrice {
  price: number | null;
  lastTradedAt: string | null;
}

export interface IPaginatedTrades {
  content: ISpecialEggTradeBoard[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

export interface ISpecialEggReward {
  specialEggId: number;
  specialEggName: string;
  imageUrl: string;
}

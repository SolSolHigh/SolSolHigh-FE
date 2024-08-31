import { IPromiseTicketCount } from '../pages/Menu/MenuChild';
import { api } from './interceptors';

export const getPromiseTicketCount = () => {
  return api.get<IPromiseTicketCount>('/api/promise-tickets/count');
};

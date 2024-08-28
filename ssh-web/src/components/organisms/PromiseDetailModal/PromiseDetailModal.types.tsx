import { IPromiseLogs } from '../../../interfaces/promiseTicketInterface';

export interface PromiseDetailModalProps {
  log: IPromiseLogs | null;
  isParent: boolean;
  closeModal: () => void;
}

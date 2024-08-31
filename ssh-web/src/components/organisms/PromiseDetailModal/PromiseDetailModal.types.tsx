import { IPromiseLogs } from '../../../interfaces/promiseTicketInterface';

export interface PromiseDetailModalProps {
  log: IPromiseLogs | null;
  isParent: boolean | null;
  closeModal: () => void;
}

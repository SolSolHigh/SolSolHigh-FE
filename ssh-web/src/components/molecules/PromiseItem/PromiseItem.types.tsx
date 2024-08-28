import { IPromiseLogs } from '../../../interfaces/promiseTicketInterface';

export interface PromiseItemProps {
  handleModal: (log: IPromiseLogs) => void;
  isConfirm: boolean;
  log: IPromiseLogs;
}

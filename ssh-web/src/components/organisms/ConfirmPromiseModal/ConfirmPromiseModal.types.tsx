import { IPromiseLogs } from '../../../interfaces/promiseTicketInterface';

export interface ConfirmPromiseModalProps {
  log: IPromiseLogs | null;
  onUpload: (id: number) => void;
}

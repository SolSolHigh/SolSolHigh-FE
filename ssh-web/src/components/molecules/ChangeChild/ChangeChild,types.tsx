import { IChild } from '../../../interfaces/userInterface';

export interface ChangeChildeProps {
  childrenList: IChild[];
  setChildrenList: React.Dispatch<React.SetStateAction<IChild[]>>;
  selectedChild: number;
  setSelectedChild: React.Dispatch<React.SetStateAction<number>>;
}

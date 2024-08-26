import { EResize } from '../../../themes/themeBase';
import { IStrickResponseList } from '../../../interfaces/quizInterface';

export interface QuizTabProps {
  size: EResize;
  isTodayQuiz: boolean;
  childNickname: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isParent: boolean;
  strick: IStrickResponseList;
}

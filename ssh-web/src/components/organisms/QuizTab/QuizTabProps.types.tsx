import { EResize } from '../../../themes/themeBase';

export interface QuizTabProps {
  size: EResize;
  isTodayQuiz: boolean;
  childId: number;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isParent: boolean;
}

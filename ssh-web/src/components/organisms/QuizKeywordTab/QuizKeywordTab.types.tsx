import { EResize } from '../../../themes/themeBase';
import { IQuizLogResponseList } from '../../../interfaces/quizInterface';

export interface KeywordsProps {
  size: EResize;
  quizLogs: IQuizLogResponseList;
  childId: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

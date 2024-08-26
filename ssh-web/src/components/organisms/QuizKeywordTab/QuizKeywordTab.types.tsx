import { EResize } from '../../../themes/themeBase';
import {
  IKeywordResponseList,
  IQuizLogResponseList,
} from '../../../interfaces/quizInterface';

export interface KeywordsProps {
  size: EResize;
  quizLogs: IQuizLogResponseList;
  childNickname: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isParent: boolean;
  keywords: IKeywordResponseList;
  ownKeywords: IKeywordResponseList;
  openKeywordModal: () => void;
  openQuizLogsModal: () => void;
}

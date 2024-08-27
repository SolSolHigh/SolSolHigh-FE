import { IQuizLogResponseList } from '../../../interfaces/quizInterface';

export interface QuizLogsDetailModalProps {
  quizLogs: IQuizLogResponseList;
  openQuizId: number;
  toggleQuizDetail: (id: number) => void;
}

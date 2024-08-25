export interface IDailyQuizResponse {
  description: string;
  keyword: string;
  quizId: number;
}

export interface IQuizResultResponse {
    realAnswer: boolean;
    isCorrect: boolean;
    quizExplanation?: string;
}

export interface IQuizLogResponse{
  description: string;
  keyword: string;
  quizId: number;
  isCorrect: boolean;
  quizExplanation: string;
  correctedAt: string;
}

export type IQuizLogResponseList = IQuizLogResponse[];
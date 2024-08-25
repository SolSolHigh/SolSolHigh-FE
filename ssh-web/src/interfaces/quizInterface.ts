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
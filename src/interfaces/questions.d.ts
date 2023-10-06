export interface Question {
  id: number;
  question: string;
  code: string;
  answers: string[];
  correctAnswer: number;
  languaje?: Languaje;
  userSelectedAnswer?: number;
  isUserAnswerCorrect?: boolean;
}

export enum Languaje {
  'JS' = 'javascript',
  'PT' = 'python',
}

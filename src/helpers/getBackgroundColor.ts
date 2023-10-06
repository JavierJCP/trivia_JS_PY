import { Question } from '../interfaces/questions';

export const getBackgroundColor = (question: Question, index: number) => {
  const { correctAnswer, userSelectedAnswer } = question;
  if (userSelectedAnswer == null) return 'transparent';
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return 'transparent';
  if (index === correctAnswer) return '#59FF77';
  if (index === userSelectedAnswer) return '#FF738C';
};

import { useQuestionStore } from '../store/questions';

export function useQuestionsScore() {
  const { questions } = useQuestionStore();
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  questions.forEach((question) => {
    if (question.userSelectedAnswer == null) unanswered++;
    else if (question.isUserAnswerCorrect) correct++;
    else incorrect++;
  });
  return { correct, incorrect, unanswered };
}

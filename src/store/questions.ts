import { create } from 'zustand';
import { Languaje, Question } from '../interfaces/questions.d';
import jsQuestion from '../mocks/javascript.json';
import ptQuestion from '../mocks/python.json';
import confetti from 'canvas-confetti';
import correctPlay from '../assets/confetti.mp3';

interface State {
  questions: Question[];
  currentQuestion: number;
  getJSQuestions: (limit: number) => void;
  getPTQuestions: (limit: number) => void;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goBackQuestion: () => void;
  resetGame: () => void;
}

export const useQuestionStore = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    getJSQuestions: (limit: number) => {
      const newQuestions = jsQuestion
        .sort(() => Math.random() - 0.5)
        .slice(0, limit) as Question[];
      newQuestions.forEach((question) => {
        question.languaje = Languaje.JS;
      });
      set({ questions: newQuestions });
    },
    getPTQuestions: (limit: number) => {
      const newQuestions = ptQuestion
        .sort(() => Math.random() - 0.5)
        .slice(0, limit) as Question[];
      newQuestions.forEach((question) => {
        question.languaje = Languaje.PT;
      });
      set({ questions: newQuestions });
    },
    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get();
      const newQuestions = structuredClone(questions);
      const questionIndex = newQuestions.findIndex(
        (item) => item.id === questionId
      );
      const questionInfo = newQuestions[questionIndex];
      const isUserAnswerCorrect = questionInfo.correctAnswer === answerIndex;
      if (isUserAnswerCorrect) {
        confetti();
        new Audio(correctPlay).play();
      }
      newQuestions[questionIndex] = {
        ...questionInfo,
        isUserAnswerCorrect,
        userSelectedAnswer: answerIndex,
      };
      set({ questions: newQuestions });
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get();
      const nexQuestion = currentQuestion + 1;
      if (nexQuestion < questions.length) {
        set({ currentQuestion: nexQuestion });
      }
    },
    goBackQuestion: () => {
      const { currentQuestion } = get();
      const backQuestion = currentQuestion - 1;
      if (backQuestion >= 0) {
        set({ currentQuestion: backQuestion });
      }
    },
    resetGame: () => {
      set({ questions: [], currentQuestion: 0 });
    },
  };
});

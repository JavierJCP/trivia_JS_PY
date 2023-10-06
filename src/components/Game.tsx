import { useQuestionStore } from '../store/questions';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import '../styles/Game.css';
import { getBackgroundColor } from '../helpers/getBackgroundColor';
import {
  BackArrowIcon,
  HappyIcon,
  NeutralIcon,
  NextArrowIcon,
  SadIcon,
} from './icons';
import Footer from './Footer';
import { useQuestionsScore } from '../hooks/useQuestionsScore';
import { resetPlay } from '../helpers/playSounds';

function Game() {
  const { correct, incorrect, unanswered } = useQuestionsScore();
  const {
    questions,
    currentQuestion,
    selectAnswer,
    goNextQuestion,
    goBackQuestion,
    resetGame,
  } = useQuestionStore();
  const question = questions[currentQuestion];

  const handleClick = (reset: () => void) => {
    resetPlay();
    reset();
  };

  return (
    <div className='game__container'>
      <div className='modal'>
        <dialog
          open={unanswered === 0}
          className={unanswered === 0 ? 'show__modal' : 'hide__modal'}
        >
          <h2>Tu puntuación</h2>
          <figure>
            {correct > questions.length / 2 && <HappyIcon />}
            {incorrect > questions.length / 2 && <SadIcon />}
            {correct === incorrect && <NeutralIcon />}
          </figure>
          <strong>Correctas: {correct}</strong>
          <strong>Incorrectas: {incorrect}</strong>
          <button
            onClick={() => handleClick(resetGame)}
            className='comic-button'
          >
            Reiniciar
          </button>
        </dialog>
      </div>

      <section className='navigate'>
        <button onClick={goBackQuestion} disabled={currentQuestion === 0}>
          <BackArrowIcon />
        </button>
        <strong>
          {currentQuestion + 1} / {questions.length}
        </strong>
        <button
          onClick={goNextQuestion}
          disabled={currentQuestion >= questions.length - 1}
        >
          <NextArrowIcon />
        </button>
      </section>
      <div className='game'>
        <h2>{question.question}</h2>
        <SyntaxHighlighter
          language={question.languaje}
          style={gradientDark}
          customStyle={{ fontSize: '18px' }}
        >
          {question.code}
        </SyntaxHighlighter>
        <ul className='asnwers'>
          {question.answers.map((answer, index) => (
            <li key={index} className='asnwer'>
              <button
                onClick={() => selectAnswer(question.id, index)}
                style={{ backgroundColor: getBackgroundColor(question, index) }}
                disabled={question.userSelectedAnswer != null}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <footer className='game__footer'>
        <Footer />
      </footer>
    </div>
  );
}

export default Game;

import { resetPlay } from '../helpers/playSounds';
import { useQuestionsScore } from '../hooks/useQuestionsScore';
import { useQuestionStore } from '../store/questions';
import '../styles/Footer.css';

const handleClick = (reset: () => void) => {
  resetPlay();
  reset();
};

function Footer() {
  const { unanswered } = useQuestionsScore();
  const { resetGame } = useQuestionStore();
  return (
    <div className='game__footer'>
      <div>
        <strong
          style={{ fontSize: '1.2rem' }}
        >{`Te faltan ${unanswered} preguntas🤔`}</strong>
      </div>
      <button onClick={() => handleClick(resetGame)} className='button'>
        Reiniciar Juego
      </button>
    </div>
  );
}

export default Footer;

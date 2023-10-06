import { startPlay } from '../helpers/playSounds';
import { useQuestionStore } from '../store/questions';
import '../styles/Start.css';
import Button from './Button';
import { JavaScriptIcon, PythonIcon } from './icons';

const LIMIT_QUESTIONS = 10;

const handleClick = (getQuestions: (limit: number) => void) => {
  startPlay();
  getQuestions(LIMIT_QUESTIONS);
};
function Start() {
  const { getJSQuestions, getPTQuestions } = useQuestionStore();
  return (
    <section className='language'>
      <div className='javascript'>
        <JavaScriptIcon />
        <div onClick={() => handleClick(getJSQuestions)}>
          <Button />
        </div>
      </div>
      <div className='python'>
        <PythonIcon />
        <div onClick={() => handleClick(getPTQuestions)}>
          <Button />
        </div>
      </div>
    </section>
  );
}

export default Start;

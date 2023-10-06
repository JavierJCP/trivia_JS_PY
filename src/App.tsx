import Game from './components/Game';
import Start from './components/Start';
import { HeaderIcon } from './components/icons';
import { useQuestionStore } from './store/questions';

function App() {
  const { questions } = useQuestionStore();
  return (
    <>
      <header>
        <h1 className='title'>
          Quiz Game <HeaderIcon />
        </h1>
        {questions.length === 0 && (
          <h2>Selecciona un lenguaje para empezar❗</h2>
        )}
      </header>
      <main>
        {questions?.length === 0 && <Start />}
        {questions?.length > 0 && <Game />}
      </main>
    </>
  );
}

export default App;

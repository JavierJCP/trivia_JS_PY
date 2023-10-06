import start from '../assets/start.mp3';
import reset from '../assets/reset.mp3';

export const startPlay = () => {
  new Audio(start).play();
};

export const resetPlay = () => {
  new Audio(reset).play();
};

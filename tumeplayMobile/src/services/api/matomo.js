import Matomo from 'react-native-matomo';

const Event = {
  playEvent: () => {
    Matomo.trackEvent('Quizz', 'Jouer', 'label', 1);
  },
  quizzDone: () => {
    Matomo.trackScreen('QuizzAllRight', 'Quizz terminé');
  },
  contentSeen: () => {
    Matomo.trackScreen('QuizzAllRight', 'Contenu visioné');
  },
  boxOrdered: () => {
    Matomo.trackScreen('BoxOrdered', 'Kit commandé');
  },
};
export default Event;

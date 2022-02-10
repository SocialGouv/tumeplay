import Matomo from 'react-native-matomo';

const Event = {
  playEvent: () => {
    Matomo.trackEvent('Quizz', 'Jouer', 'label', 1);
  },
  quizzDone: () => {
    Matomo.trackScreen('QuizzAllRight', 'Quizz finished');
  },
  contentSeen: () => {
    Matomo.trackScreen('QuizzAllRight', 'Contenu visioné');
  },
  boxOrdered: () => {
    Matomo.trackScreen('BoxOrdered', 'Box commandé');
  },
  moduleDone: () => {
    Matomo.trackEvent('Parcours', 'Module', 'label', 1);
  },
};
export default Event;

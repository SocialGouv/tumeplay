import Matomo from 'react-native-matomo';

const Event = {
  playEvent: from => {
    Matomo.trackEvent('Quizz', 'Jouer', from, 1);
  },
  quizzDone: () => {
    Matomo.trackScreen('/quizz-all-right', 'Quizz terminé');
  },
  contentSeen: id => {
    Matomo.trackScreen('/content/' + id, 'Contenu visioné');
  },
  boxOrdered: () => {
    Matomo.trackScreen('/order-confirmation', 'Kit commandé');
  },
};
export default Event;

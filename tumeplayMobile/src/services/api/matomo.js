import Matomo from 'react-native-matomo-fork';

const Event = {
  playEvent: label => {
    Matomo.trackEvent('Quizz', 'Jouer', label, 1);
  },
  orderPageEvent: label => {
    Matomo.trackEvent('Order', 'Page', label, 1);
  },
  deliveryModeEvent: label => {
    Matomo.trackEvent('Order', 'Mode de livraison', label, 1);
  },
  boxChoiceEvent: label => {
    Matomo.trackEvent('Order', 'Choice', label, 1);
  },
  orderNextButtonEvent: label => {
    Matomo.trackEvent('Order', 'Next', label, 1);
  },
  orderConfirmEvent: label => {
    Matomo.trackEvent('Order', 'Confirm', label, 1);
  },
  quizzDone: () => {
    Matomo.trackScreen('/quizz-all-right', 'Quizz terminé');
  },
  contentSeen: id => {
    Matomo.trackScreen('/content/' + id, 'Contenu visioné');
  },
  contentRead: id => {
    Matomo.trackScreen('/content/' + id, 'Contenu lu');
  },
  boxOrdered: () => {
    Matomo.trackScreen('/order-confirmation', 'Kit commandé');
  },
};
export default Event;

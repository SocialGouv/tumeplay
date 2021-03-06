const Tracking = {
  trigger: eventData => {
    try {
      var _paq = window._paq || [];

      _paq.push(eventData);
    } catch (e) {
      throw Error(e);
    }
  },

  quizStarted: () => {
    Tracking.trigger(['trackEvent', 'mobileApp', 'quiz', 'created']);
  },

  quizEnded: timeNeeded => {
    Tracking.trigger(['trackEvent', 'mobileApp', 'quiz', 'finished']);
    Tracking.trigger([
      'trackEvent',
      'mobileApp',
      'quiz',
      'quizDuration',
      timeNeeded,
    ]);
  },

  themeSelected: theme => {
    Tracking.trigger(['trackEvent', 'mobileApp', 'themeChosen', theme.value]);
  },

  questionPath: path => {
    Tracking.trigger(['trackEvent', 'mobileApp', path]);
  },
  categorySelected: (theme, category) => {
    Tracking.trigger([
      'trackEvent',
      'mobileApp',
      'catChosen',
      theme.value,
      category,
    ]);
  },
  knowMoreTriggered: (type, contentId) => {
    Tracking.trigger(['trackEvent', 'mobileApp', 'knowMore', type, contentId]);
  },
  orderButtonTriggered: () => {
    Tracking.trigger(['trackEvent', 'mobileApp', 'orderButton']);
  },
  homeDeliveryButtonTriggered: () => {
    Tracking.trigger(['trackEvent', 'mobileApp', 'homeDeliveryButton']);
  },
  pickupDeliveryButtonTriggered: () => {
    Tracking.trigger(['trackEvent', 'mobileApp', 'pickupDeliveryButton']);
  },
  referentDeliveryButtonTriggered: () => {
    Tracking.trigger(['trackEvent', 'mobileApp', 'referentDeliveryButton']);
  },
  nextPickupDeliveryButtonTriggered: () => {
    Tracking.trigger(['trackEvent', 'mobileApp', 'nextPickupDeliveryButton']);
  },
  nextHomeDeliveryButtonTriggered: () => {
    Tracking.trigger(['trackEvent', 'mobileApp', 'nextHomeDeliveryButton']);
  },
  pickupOrderButtonTriggered: () => {
    Tracking.trigger(['trackEvent', 'mobileApp', 'pickupOrderButton']);
  },
  homeOrderButtonTriggered: () => {
    Tracking.trigger(['trackEvent', 'mobileApp', 'homeOrderButton']);
  },
  referentOrderButtonTriggered: () => {
    Tracking.trigger(['trackEvent', 'mobileApp', 'referentOrderButton']);
  },
  pointsOrderButtonTriggered: () => {
    Tracking.trigger(['trackEvent', 'mobileApp', 'pointsOrderButton']);
  },
  quizzOrderButtonTriggered: () => {
    Tracking.trigger(['trackEvent', 'mobileApp', 'quizzOrderButton']);
  },
  BoxChoiceOrderButtonTriggered: () => {
    Tracking.trigger(['trackEvent', 'mobileApp', 'boxChoiceOrderButton']);
  },
  questionAnswered: (questionId, timeNeeded) => {
    Tracking.trigger([
      'trackEvent',
      'mobileApp',
      'questionDuration',
      questionId,
      timeNeeded,
    ]);
  },
  externalLink: externalLink => {
    Tracking.trigger(['trackEvent', 'mobileApp', 'externalLink', externalLink]);
  },
};
export default Tracking;

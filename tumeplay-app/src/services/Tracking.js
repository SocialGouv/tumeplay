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

  questionAnswered: (questionId, timeNeeded) => {
    Tracking.trigger([
      'trackEvent',
      'mobileApp',
      'questionDuration',
      questionId,
      timeNeeded,
    ]);
  },
};
export default Tracking;

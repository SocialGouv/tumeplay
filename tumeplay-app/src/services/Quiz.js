import Storage from './Storage';

const QuizzService = {
  storageKey: 'quizzUserData',
  currentQuestions: [],
  toImproveIds: [],
  doneIds: [],
  answersPoints: {
    WRONG: 25,
    RIGHT: 100,
    NEUTRAL: 30,
  },
  setAnswersPoints: (wrong, right, neutral) => {
    QuizzService.answersPoints.WRONG = wrong;
    QuizzService.answersPoints.RIGHT = right;
    QuizzService.answersPoints.NEUTRAL = neutral;
  },
  getTokenAmount(isRight, isNeutral) {
    let tokenAmount = QuizzService.answersPoints.WRONG;

    if (isRight) {
      tokenAmount = QuizzService.answersPoints.RIGHT;
    } else if (isNeutral) {
      tokenAmount = QuizzService.answersPoints.NEUTRAL;
    }

    return tokenAmount;
  },
  retrieveUserData: async () => {
    let userData = await Storage.get(QuizzService.storageKey);

    if (userData) {
      userData = JSON.parse(userData);
      QuizzService.toImproveIds = userData.toImproveIds;
      QuizzService.doneIds = userData.doneIds;
    }
  },
  saveUserData: async () => {
    await Storage.set(
      QuizzService.storageKey,
      JSON.stringify({
        toImproveIds: QuizzService.toImproveIds,
        doneIds: QuizzService.doneIds,
      }),
    );
  },
  setQuestions: currentQuestions => {
    QuizzService.currentQuestions = currentQuestions;
  },
  getQuestions: (reset = false) => {
    let undoneQuestions = [];

    if (reset) {
      QuizzService.doneIds = QuizzService.doneIds.filter(_ => !QuizzService.currentQuestions.map(_ => _.id).includes(_))
      undoneQuestions = QuizzService.currentQuestions;
    } else {
      undoneQuestions = QuizzService.currentQuestions.filter(
        _ => !QuizzService.doneIds.includes(_.id),
      );
    }

    const questionIds = undoneQuestions.map(_ => _.id);
    const tmpToImproveIds = QuizzService.toImproveIds.filter(_ =>
      questionIds.includes(_),
    );

    const toImproveQuestions = undoneQuestions.filter(_ => tmpToImproveIds.includes(_.id))
    const freshQuestions = undoneQuestions.filter(_ => !tmpToImproveIds.includes(_.id))
    let selectedQuestions = toImproveQuestions

    if (selectedQuestions.length < 10) {
      const numberToFill = 10 - selectedQuestions.length
      if (freshQuestions.length >= numberToFill) {
        selectedQuestions = selectedQuestions.concat(QuizzService.shuffleArray(freshQuestions).slice(0, numberToFill))
      } else {
        selectedQuestions = QuizzService.getQuestions(true)
      }
    }

    return QuizzService.shuffleArray(selectedQuestions);
  },
  moveQuestion: (question, isRightAnswer) => {
    if (isRightAnswer) {
      QuizzService.doneIds.push(question.id);

      if (QuizzService.toImproveIds.includes(question.id)) {
        QuizzService.toImproveIds = QuizzService.toImproveIds.filter(_ => _ !== question.id)
      }
    } else if (!QuizzService.toImproveIds.includes(question.id)) {
      QuizzService.toImproveIds.push(question.id);
    }
    QuizzService.saveUserData();
  },
  shuffleArray: array => {
    let i = array.length - 1;

    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  },
};
QuizzService.retrieveUserData();

export default QuizzService;

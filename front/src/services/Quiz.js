import Storage from './Storage';

const QuizService = {
  localJar: {},
  localQuestions: {},
  localQuestionsKey: 'localQuestions',
  answersPoints: {
    WRONG: 25,
    RIGHT: 100,
    NEUTRAL: 30,
  },
  getTokenAmount(question, givenAnswer) {
    let tokenAmount = QuizService.answersPoints.WRONG;

    if (givenAnswer === question.rightAnswer) {
      tokenAmount = QuizService.answersPoints.RIGHT;
    }

    if (givenAnswer === question.neutralAnswer) {
      tokenAmount = QuizService.answersPoints.NEUTRAL;
    }

    return tokenAmount;
  },
  initNewJar: questions => {
    return {
      todo: questions,
      done: [],
      toImprove: [],
    };
  },
  initQuestionsJar: async questions => {
    let localJar = await Storage.get(QuizService.localQuestionsKey);

    if (localJar) {
      localJar = JSON.parse(localJar);
    } else {
      localJar = {};
    }

    for (const index in questions) {
      const questionsKeys = Object.keys(questions[index]);

      if (!localJar[index]) {
        localJar[index] = QuizService.initNewJar(questionsKeys);
      } else {
        const jarQuestions = [
          ...localJar[index].todo,
          ...localJar[index].done,
          ...localJar[index].toImprove,
        ];

        questionsKeys.forEach(questionId => {
          if (jarQuestions.indexOf(questionId) == -1) {
            localJar[index].todo.push(questionId);
          }
        });

        jarQuestions.forEach(jarQuestionId => {
          if (questionsKeys.indexOf(jarQuestionId) == -1) {
            const todoIndex = localJar[index].todo.indexOf(jarQuestionId);
            const doneIndex = localJar[index].done.indexOf(jarQuestionId);
            const toImproveIndex = localJar[index].toImprove.indexOf(
              jarQuestionId,
            );

            if (todoIndex >= 0) {
              localJar[index].todo.splice(todoIndex, 1);
            }
            if (doneIndex >= 0) {
              localJar[index].done.splice(doneIndex, 1);
            }
            if (toImproveIndex >= 0) {
              localJar[index].toImprove.splice(toImproveIndex, 1);
            }
          }
        });
      }
    }

    QuizService.localJar = localJar;

    await QuizService.saveQuestionsJar();

    return localJar;
  },
  saveQuestionsJar: async () => {
    await Storage.set(
      QuizService.localQuestionsKey,
      JSON.stringify(QuizService.localJar),
    );
  },
  setQuestions: async allQuestions => {
    await QuizService.initQuestionsJar(allQuestions);

    QuizService.localQuestions = allQuestions;
  },
  getQuestions: async theme => {
    const themeId = theme.id;
    const localQuestions = QuizService.localJar[themeId];

    let selected = [];
    const baseCount = 10;
    let currentCount = 0;

    if (localQuestions) {
      const toImproveLength = localQuestions.toImprove.length;

      if (toImproveLength > 0) {
        if (toImproveLength <= 4) {
          selected = QuizService.extractRandomItems(
            selected,
            themeId,
            localQuestions.toImprove,
            toImproveLength,
          );
        } else {
          selected = QuizService.extractRandomItems(
            selected,
            themeId,
            localQuestions.toImprove,
            4,
          );
        }
      }

      currentCount = baseCount - selected.length;

      console.log('Total questions : ', currentCount, selected.length);

      if (localQuestions.todo.length > 0) {
        selected = QuizService.extractRandomItems(
          selected,
          themeId,
          localQuestions.todo,
          currentCount,
        );
      }

      currentCount = baseCount - selected.length;

      console.log('Total questions 2 : ', currentCount, selected.length);

      if (currentCount > 0) {
        selected = QuizService.extractRandomItems(
          selected,
          themeId,
          localQuestions.done,
          currentCount,
        );
      }

      console.log('Total questions 3 : ', currentCount, selected.length);

      selected = QuizService.shuffleArray(selected);
    }

    console.log('New questions : ', selected);

    return selected;
  },
  moveQuestion: async (question, isRightAnswer) => {
    const themeId = question.theme;
    const questionId = question.id.toString();

    let questionHandled = false;

    const todoIndex = QuizService.localJar[themeId].todo.indexOf(questionId);

    if (todoIndex >= 0) {
      if (isRightAnswer) {
        QuizService.localJar[themeId].done.push(questionId);
      } else {
        QuizService.localJar[themeId].toImprove.push(questionId);
      }

      QuizService.localJar[themeId].todo.splice(todoIndex, 1);

      questionHandled = true;
    }

    if (!questionHandled) {
      const doneIndex = QuizService.localJar[themeId].done.indexOf(questionId);
      if (doneIndex >= 0) {
        // If answer was wrong, move question to "toImprove"
        if (!isRightAnswer) {
          QuizService.localJar[themeId].toImprove.push(questionId);
          QuizService.localJar[themeId].todo.splice(doneIndex, 1);

          questionHandled = true;
        }
        // else => ignore
      }
    }

    if (!questionHandled) {
      const improveIndex = QuizService.localJar[themeId].toImprove.indexOf(
        questionId
      );

      if (improveIndex >= 0) {
        if (isRightAnswer) {
          QuizService.localJar[themeId].done.push(questionId);
          QuizService.localJar[themeId].toImprove.splice(improveIndex, 1);
          questionHandled = true;
        }
      }
    }

    if (QuizService.localJar[themeId].todo.length == 0) {
      QuizService.localJar[themeId].todo = QuizService.localJar[themeId].done;
      QuizService.localJar[themeId].done = [];
    }

    await QuizService.saveQuestionsJar();
  },
  extractRandomItems: (resultArray, themeId, targetIds, maxAdd) => {
    // In case where we ask more than we have, we select all.
    if (targetIds.length <= maxAdd) {
      for (let i = 0; i < targetIds.length; i++) {
        const localId = targetIds[i];
        resultArray.push(QuizService.localQuestions[themeId][localId]);
      }

      return resultArray;
    }

    let i = targetIds.length;
    let added = 0;
    const localIds = [];

    console.log('Target ID : ', targetIds);
    console.log('Random questions : ', QuizService.localQuestions);
    for (; i > 0; i--) {
      let randomLocalIndex = Math.floor(Math.random() * (i + 1));

      console.log('Random local : ', randomLocalIndex);

      randomLocalIndex =
        randomLocalIndex == 0 ? randomLocalIndex : randomLocalIndex - 1;

      const randomQuestionId = targetIds[randomLocalIndex];

      if (localIds.indexOf(randomQuestionId) >= 0) {
        continue;
      }

      localIds.push(randomQuestionId);
      console.log('Random question : ', randomQuestionId);

      resultArray.push(QuizService.localQuestions[themeId][randomQuestionId]);

      added++;

      if (added >= maxAdd) {
        i = 0;
      }
    }

    return resultArray;
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
export default QuizService;

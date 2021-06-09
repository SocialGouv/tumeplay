/**
 * @format
 */

import 'react-native';
import 'isomorphic-fetch';
jest.resetModules();
import RemoteApi from '../src/services/RemoteApi';
import {shuffleArray} from '../src/screens/ContentScreen';

const selected = {
  key: 1,
  id: 1,
  isSpecial: false,
  picture: false,
  value: 'Découvre ton corps',
};

/* test Quiz */
describe('call api of Quiz', () => {
  it('the selection of questions should respect the rules', async () => {
    const data = await RemoteApi.fetchQuestions(selected);
    expect(data).toBeDefined();
    const questions = shuffleArray(data);
    const randomQuestions = questions.slice(0, 10);
    expect(randomQuestions).toContainEqual(
      expect.objectContaining({
        theme: 1,
      }),
    );
    // retry
    const questionsRetry = shuffleArray(data);
    const randomQuestionsRetry = questionsRetry.slice(0, 10);
    expect(randomQuestions).not.toEqual(
      expect.arrayContaining(randomQuestionsRetry),
    );
  });
});

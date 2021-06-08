/**
 * @format
 */

import User from '../src/services/User';
import QuizAmount from '../src/services/Quiz';
import Storage from '../src/services/Storage';

const question = {
  answers: [
    {text: 'Oui', id: 1},
    {text: 'Non', id: 2},
    {text: 'Je ne sais pas', id: 3},
  ],
  background: false,
  category: 2,
  explanation:
    "Rêver de choses érotiques, cest normal. Ça arrive à ladolescence mais ça continue après. Ces rêves peuvent déclencher un orgasme, une éjaculation. Dans un rêve érotique, on choisit pas le scénario, il simpose. Pas de panique ! Rêver de certaines choses même bizarres ne veut pas dire qu'on est pervers. Il ne faut pas prendre les rêves au premier degré.",
  id: 18,
  key: 18,
  neutralAnswer: false,
  question:
    'Les rêves érotiques peuvent déclencher une éjaculation ou un orgasme ?',
  rightAnswer: 1,
  theme: 1,
};

/* test scoring */
it('test response of user', () => {
  const correctAnswer = QuizAmount.getTokenAmount(question, 1);
  const wrongAnswer = QuizAmount.getTokenAmount(question, 2);
  expect(correctAnswer).toEqual(100);
  expect(wrongAnswer).toEqual(25);
});

/* id  in localStorage */
it('test id in localStorage', async () => {
  const existedUser = await Storage.get('local.user');
  expect(existedUser).toBeNull();
  const uniqId = await User.getUniqueId();
  expect(uniqId).toBeDefined();
  expect(uniqId).not.toBe('');
  const idLocalStorage = JSON.parse(await Storage.get('local.user'));
  expect(idLocalStorage.id).not.toBe('');
});

/* create and check HMAC */
it('create and check HMAC', async () => {
  const oldHmac = await User.loadHmac();
  await User.addTokens(100);
  const oldUser = JSON.parse(await Storage.get('local.user'));
  expect(oldUser.availableTokens).toBe(100);
  await User.init();
  //check if HMAC is changed
  const newHmac = await User.loadHmac();
  // compare between the two HMACs
  expect(oldHmac).not.toBe(newHmac);
  expect(newHmac).toBeDefined();
  //the points of the new user should be equal to 0
  const newUser = JSON.parse(await Storage.get('local.user'));
  expect(newUser.availableTokens).toBe(0);
});

/* localstorage */
describe('Points increment correctly in LocalStorage', () => {
  it('compare the points before and after add  ', async () => {
    const value = 25;
    const tokensAmountBefore = await User.getTokensAmount();
    expect(tokensAmountBefore).toBeDefined();

    // add new points
    const newToken = await User.addTokens(value);
    expect(newToken).toBeDefined();
    expect(newToken).toBe(tokensAmountBefore + value);
    // get value of points after add
    const tokensAmountAfter = await User.getTokensAmount();
    expect(tokensAmountAfter).toBeDefined();
    const user = JSON.parse(await Storage.get('local.user'));

    // compare between them
    expect(user.availableTokens).toEqual(tokensAmountAfter);
    expect(user).toEqual(
      expect.objectContaining({
        availableTokens: 25,
      }),
    );
  });
});

import React from 'react';
import QuizzWithWrongAnswers from './QuizzFinish/QuizzWithWrongAnswers';
import QuizzAllRight from './QuizzFinish/QuizzAllRight';

const QuizzFinishScreen = ({navigation, route}) => {
  const correctAnswers = route?.params?.correctAnswers;
  const wrongAnswers = route?.params?.wrongAnswers;

  const pointsEarned = correctAnswers.length * 100;

  return wrongAnswers.length > 1 ? (
    <QuizzWithWrongAnswers
      correctAnswers={correctAnswers}
      wrongAnswers={wrongAnswers}
      pointsEarned={pointsEarned}
      navigation={navigation}
    />
  ) : (
    <QuizzAllRight pointsEarned={pointsEarned} />
  );
};

export default QuizzFinishScreen;

import React from 'react';
import QuizzWithWrongAnswers from './QuizzFinish/QuizzWithWrongAnswers';
import QuizzAllRight from './QuizzFinish/QuizzAllRight';

const QuizzFinishScreen = ({navigation, route}) => {
  const correctAnswers = route?.params?.correctAnswers;
  const wrongAnswers = route?.params?.wrongAnswers;
  const module_id = route?.params?.module_id;

  const pointsEarned = (correctAnswers.length + 1) * 100;

  return wrongAnswers.length > 0 ? (
    <QuizzWithWrongAnswers
      correctAnswers={correctAnswers}
      wrongAnswers={wrongAnswers}
      pointsEarned={pointsEarned}
      navigation={navigation}
      module_id={module_id}
    />
  ) : (
    <QuizzAllRight
      pointsEarned={pointsEarned}
      navigation={navigation}
      module_id={module_id}
    />
  );
};

export default QuizzFinishScreen;

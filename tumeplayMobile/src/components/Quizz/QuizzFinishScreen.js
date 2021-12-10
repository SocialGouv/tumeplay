import React from 'react';
import QuizzWithWrongAnswers from './QuizzFinish/QuizzWithWrongAnswers';
import QuizzAllRight from './QuizzFinish/QuizzAllRight';

const QuizzFinishScreen = ({navigation, route}) => {
  const correctAnswers = route?.params?.correctAnswers;
  const wrongAnswers = route?.params?.wrongAnswers;

  return wrongAnswers.length > 1 ? (
    <QuizzAllRight />
  ) : (
    <QuizzWithWrongAnswers
      correctAnswers={correctAnswers}
      wrongAnswers={wrongAnswers}
      navigation={navigation}
    />
  );
};

export default QuizzFinishScreen;

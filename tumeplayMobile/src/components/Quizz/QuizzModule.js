import {stubFalse} from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import bg from '../../assets/Quiiz_BG.png';
import {Fonts} from '../../styles/Style';
import Button from '../Button';
import QuizzAnswerButton from './QuizzAnswerButton';
import TopLevelPointIndicator from './TopLevelPointIndicator';

const QuizzModule = ({navigation, route}) => {
  const question = route?.params?.question;
  const questions_ids = route?.params?.questions_ids;
  const remaining_ids = questions_ids?.filter(id => id !== question.id);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [responses, setResponses] = useState([]);
  const [displayResponse, setDisplayResponse] = useState(false);

  const formatAnswers = () => {
    let tmpResponses = [];
    for (let [key, value] of Object.entries(question.responses)) {
      key = key.substring(9, 10);
      tmpResponses?.push({key, value});
    }
    tmpResponses?.shift();
    setResponses(tmpResponses);
  };

  const displayAnswerText = () => {
    setHasAnswered(true);
    setDisplayResponse(true);
  };

  const displayAnswer = responses?.map((ans, index) => {
    if (index < responses.length - 1)
      return (
        <QuizzAnswerButton
          answer={ans}
          correctAnswer={responses[responses.length - 1]?.value}
          hasAnswered={hasAnswered}
          key={ans.key}
          onPress={() => displayAnswerText()}
        />
      );
  });

  useEffect(() => {
    formatAnswers();
  }, []);

  return (
    <ImageBackground source={bg} style={styles.container}>
      <View style={styles.levelIndicator}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>RETOUR</Text>
        </TouchableOpacity>
        <TopLevelPointIndicator />
      </View>
      <View style={styles.stepIndicator}>
        <Text style={styles.indicator}>{remaining_ids?.length}</Text>
      </View>
      <Text style={styles.question}>{question?.text_question}</Text>
      <View style={styles.answersContainer}>{displayAnswer}</View>
      {displayResponse ? (
        <View style={styles.answerContainer}>
          <Text style={styles.textAnswer}>{question.text_answer}</Text>
        </View>
      ) : null}
      {hasAnswered ? (
        <Button text={'Suivant'} size="large" style={styles.bottomButton} />
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  levelIndicator: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepIndicator: {
    width: 58,
    height: 58,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFF',
    borderWidth: 5,
    marginBottom: 10,
  },
  indicator: {
    fontFamily: Fonts.strongText,
    fontSize: 18,
    lineHeight: 22,
  },
  question: {
    marginBottom: 10,
    fontFamily: Fonts.subtitle,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  answersContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  answerContainer: {
    marginHorizontal: 10,
    alignContent: 'center',
  },
  textAnswer: {
    marginTop: 10,
    textAlign: 'center',
  },
  bottomButton: {
    marginTop: 100,
  },
});

export default QuizzModule;

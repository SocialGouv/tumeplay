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
import _ from 'lodash';
import Container from '../global/Container';

const QuizzModule = ({navigation, route}) => {
  const questions = route?.params?.questions;
  const module_id = route?.params?.module_id;
  const question = questions[0];
  const [hasAnswered, setHasAnswered] = useState(false);
  const [responses, setResponses] = useState([]);
  const [displayResponse, setDisplayResponse] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [remainingQuestions, setRemainingQuestions] = useState([]);
  const retry = route?.params?.retry;
  const [disabled, setDisabled] = useState(false);

  const formatAnswers = () => {
    let tmpResponses = [];
    for (let [key, value] of Object.entries(question?.responses)) {
      key = key.substring(9, 10);
      tmpResponses?.push({key, value});
    }
    tmpResponses?.shift();
    setResponses(tmpResponses);
  };

  const displayAnswerText = ans => {
    if (ans === responses[responses?.length - 1]?.value) {
      correctAnswers.push(question);
      setCorrectAnswers([...correctAnswers]);
    } else {
      wrongAnswers.push(question);
      setWrongAnswers([...wrongAnswers]);
    }
    setDisabled(!disabled);
    setHasAnswered(!hasAnswered);
    setDisplayResponse(!displayResponse);
  };

  const displayAnswer = responses?.map((ans, index) => {
    if (index < responses.length - 1)
      return (
        <QuizzAnswerButton
          answer={ans}
          correctAnswer={responses[responses?.length - 1]?.value}
          hasAnswered={hasAnswered}
          disabled={disabled}
          key={ans.key}
          onPress={() => displayAnswerText(ans.key)}
        />
      );
  });

  const goToNextQuestion = () => {
    if (remainingQuestions.length === 0) {
      navigation.navigate('QuizzFinishScreen', {
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
        module_id: module_id,
      });
    } else {
      navigation.navigate('QuizzModule', {
        questions: _.shuffle(remainingQuestions),
        module_id: module_id,
      });
      setDisabled(!disabled);
      setHasAnswered(!hasAnswered);
      setDisplayResponse(!displayResponse);
    }
  };

  useEffect(() => {
    setRemainingQuestions(questions?.filter(ques => ques.id !== question.id));
    formatAnswers();
    if (retry) {
      setDisplayResponse(!displayResponse);
      setHasAnswered(!hasAnswered);
      setDisabled(!disabled);
      setWrongAnswers([]);
      setCorrectAnswers([]);
    }
  }, [question]);

  return (
    <Container background={bg} style={styles.container}>
      <View style={styles.levelIndicator}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Retour</Text>
        </TouchableOpacity>
        <TopLevelPointIndicator />
      </View>
      <View style={styles.stepIndicator}>
        <Text style={styles.indicator}>{questions?.length}</Text>
      </View>
      <Text style={styles.question}>{question?.text_question}</Text>
      <View style={styles.answersContainer}>{displayAnswer}</View>
      {displayResponse ? (
        <View style={styles.answerContainer}>
          <Text style={styles.textAnswer}>{question?.text_answer}</Text>
        </View>
      ) : null}
      {hasAnswered ? (
        <Button
          text={'Suivant'}
          size="large"
          style={styles.bottomButton}
          onPress={() => goToNextQuestion()}
        />
      ) : null}
    </Container>
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
    position: 'absolute',
    bottom: 45,
  },
});

export default QuizzModule;

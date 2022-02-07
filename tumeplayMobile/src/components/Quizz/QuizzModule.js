import React, {useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet, View, ScrollView} from 'react-native';
import bg from '../../assets/Quiiz_BG.png';
import {Fonts} from '../../styles/Style';
import Button from '../Button';
import QuizzAnswerButton from './QuizzAnswerButton';
import TopLevelPointIndicator from './TopLevelPointIndicator';
import _ from 'lodash';
import Container from '../global/Container';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../../../config';
import Text from '../../components/Text';

const QuizzModule = ({navigation, route}) => {
  const questions = route?.params?.questions;
  const module_id = route?.params?.module_id;
  const clearModuleData = route?.params?.clearModuleData;
  const improveWrongAnswers = route?.params?.improveWrongAnswers;

  const question = questions[0];

  const [questionTitle, setQuestionTitle] = useState(question.text_question);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [responses, setResponses] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [remainingQuestions, setRemainingQuestions] = useState([]);
  const [showAnswer, setshowAnswer] = useState(false);
  const [answeredKey, setAnswerKey] = useState('');

  const formatAnswers = () => {
    let tmpResponses = [];
    for (let [key, value] of Object.entries(question?.responses)) {
      key = key.substring(9, 10);
      tmpResponses?.push({key, value});
    }
    tmpResponses?.shift();
    setResponses(tmpResponses);
  };

  const displayAnswerText = answerKey => {
    if (answerKey === responses[responses?.length - 1]?.value) {
      correctAnswers.push(question);
      setCorrectAnswers([...correctAnswers]);
    } else {
      wrongAnswers.push(question);
      setWrongAnswers([...wrongAnswers]);
    }

    if (question.kind === 'Trou') {
      setQuestionTitle(
        question.text_question.replace(
          /([_])\1{2,}/g,
          question.responses['response_' + answerKey],
        ),
      );
    }

    setAnswerKey(answerKey);
    setHasAnswered(!hasAnswered);
  };

  const displayAnswer = responses?.map((ans, index) => {
    if (index < responses.length - 1) {
      return (
        <QuizzAnswerButton
          answer={ans}
          correctAnswer={responses[responses?.length - 1]?.value}
          hasAnswered={hasAnswered}
          disabled={hasAnswered}
          key={ans.key}
          answerTrou={question.kind === 'Trou'}
          answeredKey={answeredKey}
          onPress={() => displayAnswerText(ans.key)}
        />
      );
    }
  });

  const goToNextQuestion = () => {
    if (remainingQuestions.length === 0) {
      navigation.navigate('QuizzFinishScreen', {
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
        module_id: module_id,
      });
    } else {
      setshowAnswer(false);
      navigation.navigate('QuizzModule', {
        questions: _.shuffle(remainingQuestions),
        module_id: module_id,
      });
      setHasAnswered(!hasAnswered);
    }
  };

  useEffect(() => {
    setRemainingQuestions(questions?.filter(ques => ques.id !== question.id));
    setQuestionTitle(questions[0]?.text_question);
    formatAnswers();
    setHasAnswered(false);

    if (clearModuleData) {
      setCorrectAnswers([]);
      setWrongAnswers([]);
    }

    if (improveWrongAnswers) {
      setWrongAnswers([]);
    }
  }, [route]);

  const showMoreAnswer = () => {
    setshowAnswer(!showAnswer);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Container background={bg} style={styles.container}>
        <View style={styles.levelIndicator}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="md-arrow-back"
              size={30}
              color="#000"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TopLevelPointIndicator />
        </View>
        <View style={styles.stepIndicatorContainer}>
          <View style={styles.stepIndicator}>
            <Text style={styles.indicator}>{questions?.length}</Text>
          </View>
        </View>
        {question.kind === 'Trou' && (
          <Text style={styles.completeText}>Complète cette phrase</Text>
        )}
        <Text style={styles.question}>{questionTitle}</Text>
        <View
          style={[
            styles.answersContainer,
            question.kind === 'Trou' ? styles.answersContainerTrou : '',
          ]}>
          {displayAnswer}
        </View>
        {hasAnswered ? (
          <View style={styles.answerContainer}>
            <Text style={styles.textAnswer}>
              {!showAnswer && config.deviceWidth <= 375
                ? question?.text_answer.substring(0, 80) + '...'
                : question?.text_answer}
            </Text>
            {config.deviceWidth <= 375 && (
              <Text onPress={showMoreAnswer} style={styles.action}>
                {showAnswer ? 'Voir moins' : 'Voir plus'}
              </Text>
            )}
          </View>
        ) : null}
        {hasAnswered ? (
          <View style={styles.buttonContainer}>
            <Button
              text={'Suivant'}
              size="large"
              icon={true}
              style={styles.bottomButton}
              onPress={() => goToNextQuestion()}
            />
          </View>
        ) : null}
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: config.deviceWidth <= 375 ? 'auto' : '100%',
    alignContent: 'center',
  },
  container: {
    height: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  levelIndicator: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 26,
  },
  stepIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  stepIndicator: {
    width: 58,
    height: 58,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFF',
    borderWidth: 5,
    marginBottom: 16,
  },
  indicator: {
    fontFamily: Fonts.subtitle,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
  },
  question: {
    marginBottom: 10,
    fontFamily: Fonts.subtitle,
    fontSize: config.deviceWidth <= 375 ? 16 : 22,
    lineHeight: 24,
    fontWeight: '700',
  },
  answersContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginHorizontal: config.deviceWidth <= 375 ? 0 : -10,
  },
  answersContainerTrou: {
    flexDirection: 'column',
    marginTop: 20,
  },
  textAnswer: {
    marginTop: 10,
    textAlign: 'left',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 20,
    flex: 1,
  },
  bottomButton: {
    position: config.deviceWidth <= 375 ? 'relative' : 'absolute',
    bottom: config.deviceWidth <= 375 ? 0 : 30,
  },
  action: {
    fontWeight: '600',
  },
  completeText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 18,
  },
});

export default QuizzModule;

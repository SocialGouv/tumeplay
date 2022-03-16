import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import bg from '../../assets/Quiiz_BG.png';
import {Fonts} from '../../styles/Style';
import Button from '../Button';
import QuizzAnswerButton from './QuizzAnswerButton';
import TopLevelPointIndicator from './TopLevelPointIndicator';
import _ from 'lodash';
import Container from '../global/Container';
import Icon from 'react-native-vector-icons/Entypo';
import config from '../../../config';
import Text from '../../components/Text';
import * as Progress from 'react-native-progress';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppContext from '../../../AppContext';
import {CREATE_HISTORY} from '../../services/api/mobile_users';
import {useMutation} from '@apollo/client';
import GestureRecognizer from '../../lib/swipe';

const QuizzModule = ({navigation, route}) => {
  const questions = route?.params?.questions;
  const module_id = route?.params?.module_id;
  const theme = route?.params?.theme;
  const clearModuleData = route?.params?.clearModuleData;
  const improveWrongAnswers = route?.params?.improveWrongAnswers;
  const retry = route?.params?.retry;

  console.log('LOADED', theme);

  const question = questions[0];

  const [questionTitle, setQuestionTitle] = useState(question.text_question);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [responses, setResponses] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [remainingQuestions, setRemainingQuestions] = useState([]);
  const [showAnswer, setshowAnswer] = useState(false);
  const [answeredKey, setAnswerKey] = useState('');
  const [createHistory] = useMutation(CREATE_HISTORY);

  let fullQuizzLength = useRef(questions.length);
  const progress =
    (correctAnswers.length + wrongAnswers.length) / fullQuizzLength.current;

  const {user, reloadUser} = useContext(AppContext);

  const formatAnswers = () => {
    let tmpResponses = [];
    for (let [key, value] of Object.entries(question?.responses)) {
      key = key.substring(9, 10);
      tmpResponses?.push({key, value});
    }
    tmpResponses?.shift();
    setResponses([...tmpResponses]);
  };

  const displayAnswerText = answerKey => {
    if (answerKey === question.responses.right_answer) {
      correctAnswers.push(question);
      setCorrectAnswers([...correctAnswers]);
    } else {
      wrongAnswers.push(question);
      setWrongAnswers([...wrongAnswers]);
    }

    if (question.kind === 'Trou') {
      let newTitle = question.text_question.replace(
        /([_])\1{2,}/g,
        question.responses['response_' + answerKey],
      );

      let interrogationPointIndex = newTitle.indexOf('?');
      newTitle = interrogationPointIndex
        ? newTitle.slice(0, interrogationPointIndex) +
          newTitle.slice(interrogationPointIndex + 1)
        : newTitle;

      setQuestionTitle(newTitle);
    }
    setAnswerKey(answerKey);
    setHasAnswered(!hasAnswered);
  };

  const displayAnswer = responses?.map((ans, index) => {
    return (
      <QuizzAnswerButton
        answer={ans}
        correctAnswer={question.responses.right_answer}
        hasAnswered={hasAnswered}
        disabled={hasAnswered}
        key={ans.key}
        answerTrou={question.kind === 'Trou'}
        answeredKey={answeredKey}
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
        retry,
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

  const handleStartQuizz = async () => {
    if (!user.pending_module) {
      try {
        await createHistory({
          variables: {
            user_id: user?.id,
            module_id: module_id,
            status: 'pending',
          },
        });
        reloadUser();
      } catch (error) {
        console.log('Erreur au lancement du quizz:', error);
        Alert.alert(
          "Une erreur s'est produite au lancement du quizz",
          'Merci de relancer un quizz',
          [
            {
              text: 'Annuler',
              onPress: () => {
                navigation.navigate('Home', {screen: 'QuizzLoader'});
              },
            },
            {
              text: 'Ok',
              onPress: () => {
                navigation.navigate('Home');
              },
            },
          ],
        );
      }
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
      if (!retry) {
        handleStartQuizz();
      }
      fullQuizzLength.current = questions.length;
    }

    if (improveWrongAnswers) {
      setWrongAnswers([]);
    }
  }, [route]);

  const swipeConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 10,
  };

  return (
    <GestureRecognizer
      style={styles.swipeContainer}
      config={swipeConfig}
      onSwipeLeft={() => navigation.navigate('Home', {screen: 'Accueil'})}
      onSwipeRight={() => navigation.navigate('Home', {screen: 'Accueil'})}>
      <View style={styles.bgContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <Container background={bg} style={styles.container}>
            <View style={styles.levelIndicator}>
              <TouchableOpacity
                style={styles.chevron}
                onPress={() =>
                  navigation.navigate('Home', {screen: 'Accueil'})
                }>
                <Icon name="chevron-small-left" size={40} color="#000" />
                <Text>Retour</Text>
              </TouchableOpacity>
              <TopLevelPointIndicator />
            </View>
            <View style={styles.stepIndicatorContainer}>
              <Progress.Circle
                showsText={true}
                borderWidth={0}
                thickness={5}
                formatText={() => questions.length}
                unfilledColor={'#FFFFFF80'}
                textStyle={styles.stepIndicator}
                progress={progress}
                size={60}
                color={'#EC6233'}
              />
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
                  {!showAnswer && question?.text_answer}
                </Text>
              </View>
            ) : null}
          </Container>
        </ScrollView>
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
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  swipeContainer: {
    flex: 1,
  },
  bgContainer: {
    flex: 1,
    backgroundColor: '#F9EEF2',
  },
  scrollContainer: {
    flex: 1,
    alignContent: 'center',
    paddingBottom: 60,
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
  chevron: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  stepIndicator: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
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
    fontSize: config.deviceWidth <= 400 ? 16 : 22,
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
    marginHorizontal: config.deviceWidth <= 400 ? 0 : -10,
  },
  answersContainerTrou: {
    flexDirection: 'column',
    marginTop: 30,
  },
  textAnswer: {
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'left',
  },
  buttonContainer: {
    paddingHorizontal: 15,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    position: config.deviceWidth <= 400 ? 'relative' : 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
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

import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Image,
  Vibration,
} from 'react-native';
import {Colors, Fonts} from '../../styles/Style';
import Button from '../Button';
import QuizzAnswerButton from './QuizzAnswerButton';
import ThemeIndicator from '../ThemeIndicator';
import _ from 'lodash';
import Container from '../global/Container';
import Icon from 'react-native-vector-icons/Entypo';
import config from '../../../config';
import Text from '../../components/Text';
import * as Progress from 'react-native-progress';
import AppContext from '../../../AppContext';
import {CREATE_HISTORY} from '../../services/api/mobile_users';
import {useMutation} from '@apollo/client';
import response_api from '../../services/api/responses';
import GestureRecognizer from '../../lib/swipe';
import right from '../../assets/Right.png';
import wrong from '../../assets/Wrong.png';
import * as Animatable from 'react-native-animatable';

const QuizzModule = ({navigation, route}) => {
  const questions = route?.params?.questions;
  const module_id = route?.params?.module_id;
  const module_title = route?.params?.module_title;
  const theme = route?.params?.theme;
  const clearModuleData = route?.params?.clearModuleData;
  const improveWrongAnswers = route?.params?.improveWrongAnswers;
  const retry = route?.params?.retry;
  const firstTry = route?.params?.firstTry;
  const from_journey = route?.params?.from_journey;
  const question = questions[0];

  const [questionTitle, setQuestionTitle] = useState(question.text_question);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [responses, setResponses] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [remainingQuestions, setRemainingQuestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setshowAnswer] = useState(false);
  const [answeredKey, setAnswerKey] = useState('');
  const [createHistory] = useMutation(CREATE_HISTORY);

  const AnimatedView = Animatable.createAnimatableComponent(View);

  let fullQuizzLength = useRef(questions.length);
  const progress =
    (correctAnswers.length + wrongAnswers.length) / fullQuizzLength.current;

  const {user, reloadUser, apiUrl} = useContext(AppContext);

  const formatAnswers = () => {
    let tmpResponses = [];
    for (let [key, value] of Object.entries(question?.responses)) {
      key = key.substring(9, 10);
      if (value) tmpResponses?.push({key, value});
    }
    tmpResponses?.shift();
    _.remove(tmpResponses, {key: 'w'});
    setResponses([...tmpResponses]);
  };

  const displayAnswerText = (answerKey, index) => {
    if (answerKey === question.responses.right_answer) {
      correctAnswers.push(question);
      setCorrectAnswers([...correctAnswers]);
    } else {
      wrongAnswers.push(question);
      setWrongAnswers([...wrongAnswers]);
      Vibration.vibrate(200);
    }

    if (question.save_response && firstTry) {
      response_api.saveResponseMobile(
        apiUrl,
        question.responses['response_' + answerKey],
        question.id,
        user.id,
      );
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
    setSelected(index);
    setAnswerKey(answerKey);
    setHasAnswered(!hasAnswered);
  };

  const displayAnswer = responses?.map((ans, index) => {
    return (
      <QuizzAnswerButton
        answer={ans}
        selected={selected}
        index={index}
        correctAnswer={question.responses.right_answer}
        hasAnswered={hasAnswered}
        disabled={hasAnswered}
        key={index}
        answerTrou={question.kind === 'Trou'}
        answeredKey={answeredKey}
        onPress={() => displayAnswerText(ans.key, index)}
      />
    );
  });

  const goToNextQuestion = () => {
    if (remainingQuestions.length === 0) {
      navigation.navigate('QuizzFinishScreen', {
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
        module_id: module_id,
        theme: theme,
        retry,
        firstTry,
      });
    } else {
      setshowAnswer(false);
      navigation.navigate('QuizzModule', {
        questions: _.shuffle(remainingQuestions),
        theme: theme,
        module_id: module_id,
        module_title: module_title,
        firstTry,
      });
      setHasAnswered(!hasAnswered);
    }
  };

  const handleStartQuizz = async () => {
    if (!user.pending_modules?.includes(parseInt(module_id)) && !retry) {
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
        Vibration.vibrate(200);
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
      <Container style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.levelIndicator}>
            <TouchableOpacity
              style={styles.chevron}
              onPress={() =>
                from_journey
                  ? navigation.goBack()
                  : navigation.navigate('Home', {screen: 'Accueil'})
              }>
              <Icon name="chevron-small-left" size={40} color="#000" />
              <Text>Retour</Text>
            </TouchableOpacity>
            <ThemeIndicator theme={theme} />
          </View>
          <View style={styles.stepIndicatorContainer}>
            <Text style={styles.moduleTitle}>{module_title}</Text>
            <View style={styles.progressionContainer}>
              <Progress.Circle
                showsText={true}
                borderWidth={0}
                thickness={5}
                formatText={() => {
                  return `${correctAnswers.length + wrongAnswers.length} / ${
                    fullQuizzLength.current
                  }`;
                }}
                textStyle={styles.stepIndicator}
                unfilledColor={'#FFFFFF80'}
                progress={progress}
                size={60}
                color={'#51B070'}
              />
            </View>
          </View>
          <View style={styles.questionContainer}>
            {question.kind === 'Trou' && (
              <Text style={styles.completeText}>Complète cette phrase</Text>
            )}
            <Text style={styles.question}>{questionTitle}</Text>
            <View
              style={[
                styles.answersContainer,
                question.kind === 'Trou' ? styles.answersContainerTrou : '',
              ]}>
              {!hasAnswered && (
                <ScrollView style={{width: '100%'}}>{displayAnswer}</ScrollView>
              )}
            </View>
          </View>
        </View>
        {hasAnswered ? (
          <AnimatedView
            animation="fadeInUp"
            duration={500}
            easing="ease-in-out"
            style={[styles.bottomContainer]}>
            {answeredKey === question.responses.right_answer ? (
              <View style={styles.responseContainer}>
                <Image style={styles.bottomImage} source={right} />
                <Text style={styles.answerTitle}> Bonne réponse !</Text>
              </View>
            ) : (
              <View style={styles.responseContainer}>
                <Image style={styles.bottomImage} source={wrong} />
                <Text style={styles.answerTitle}>Mauvaise réponse</Text>
              </View>
            )}
            <ScrollView>
              <Text style={styles.textAnswer}>
                {!showAnswer && question?.text_answer}
              </Text>
            </ScrollView>
          </AnimatedView>
        ) : null}
      </Container>
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
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  swipeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  topContainer: {
    flex: 0.7,
    backgroundColor: Colors.background,
    paddingBottom: 60,
  },
  levelIndicator: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chevron: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: config.deviceWidth,
    marginBottom: 20,
  },
  progressionContainer: {
    flexDirection: 'row',
  },
  moduleTitle: {
    paddingVertical: 10,
    fontWeight: '500',
    fontSize: config.deviceWidth * 0.03,
  },
  stepIndicator: {
    fontSize: config.deviceWidth * 0.03,
    color: Colors.black,
    fontWeight: '700',
  },
  indicator: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  question: {
    paddingHorizontal: 16,
    fontFamily: Fonts.subtitle,
    fontSize: config.deviceWidth <= 400 ? 20 : 22,
    lineHeight: 30,
    fontWeight: '700',
  },
  answersContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginHorizontal: config.deviceWidth <= 400 ? 10 : -10,
  },
  answersContainerTrou: {
    flexDirection: 'column',
    marginTop: 30,
  },

  textAnswer: {
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'justify',
    paddingLeft: 26,
    fontWeight: '500',
    fontSize: config.deviceWidth * 0.041,
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
  questionContainer: {
    width: config.deviceWidth,
  },
  completeText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 18,
  },
  bottomContainer: {
    width: config.deviceWidth,
    backgroundColor: '#FFF',
    flex: 0.9,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 70,
  },
  responseContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    textAlignVertical: 'center',
    alignItems: 'center',
  },
  answerTitle: {
    fontSize: config.deviceWidth * 0.045,
    fontWeight: '700',
    paddingLeft: 14,
  },
});

export default QuizzModule;

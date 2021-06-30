import React, {useState, useEffect} from 'react';
import {Text, View, ImageBackground, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import Styles from '../styles/Styles';
import {EventRegister} from 'react-native-event-listeners';

import UserService from '../services/User';
import Tracking from '../services/Tracking';
import AnswerScreen from './components/quizz/AnswerScreen';
import NextButton from './components/quizz/NextButton';
import AnswerButton from './components/quizz/AnswerButton';
import QuizService from '../services/Quiz';
import FeedbacksAPI from '../services/api/feedbacks';
import {useQuery} from '@apollo/client';
import {GET_POINTS} from '../services/api/settings';
import ResponsesAPI from '../services/api/responses';

QuizzScreen.propTypes = {
  questions: PropTypes.array,
  onFinishedQuizz: PropTypes.func,
};

export default function QuizzScreen(props) {
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [isRightAnswer, setIsRightAnswer] = useState(false);
  const [questions, setQuestions] = useState(props.questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [total, setTotal] = useState(questions.length);
  const [lastTokenAmount, setLastTokenAmount] = useState(0);
  const [givenAnswers, setGivenAnswers] = useState([]);
  const [dataFeedback, setDataFeedback] = useState({});

  const _currentQuestion = questions[currentIndex];

  var questionTimer = Math.floor(Date.now() / 1000);

  useEffect(() => {
    setQuestions(props.questions);
    setTotal(props.questions.length);
    setCurrentIndex(0);
    setLastTokenAmount(0);
    setDisplayAnswer(false);
    setIsRightAnswer(false);
  }, [props.questions]);

  async function _addTokens(_tokenAmount) {
    const _newTokens = await UserService.addTokens(_tokenAmount);
    await UserService.updateToLatestBadge();

    EventRegister.emit('tokensAmountChanged', _newTokens);
  }

  const {data, loading} = useQuery(GET_POINTS);
  if (!loading) {
    QuizService.setAnswersPoints(
      data.parametre.nb_points_wrong_answer,
      data.parametre.nb_points_right_answer,
      data.parametre.nb_points_neutral_answer,
    );
  }

  function _answerQuestion(key) {
    questionTimer = Math.floor(Date.now() / 1000) - questionTimer;

    const currentQuestion = questions[currentIndex];

    const localAnswer = {
      questionId: currentQuestion.id,
      givenAnswer: key,
    };

    Tracking.questionAnswered(currentQuestion.id, questionTimer);

    const isRightAnswer = currentQuestion.responses.right_answer === key;
    const isNeutralAnswer =
      currentQuestion.responses['response_' + key + '_neutral'];

    QuizService.moveQuestion(currentQuestion, isRightAnswer);

    setIsRightAnswer(isRightAnswer);

    const _tokenAmount = QuizService.getTokenAmount(
      isRightAnswer,
      isNeutralAnswer,
    );
    setLastTokenAmount(_tokenAmount);
    _addTokens(_tokenAmount);

    setDisplayAnswer(!displayAnswer);
    handleUserStat(localAnswer);
    setGivenAnswers(prevState => ({...prevState, localAnswer}));
  }

  const handleUserStat = (localAnswer) => {
    const localStorage = window.localStorage.getItem('local.user');
    const JsonObject = JSON.parse(localStorage);
    const userID = JsonObject.uniqueId;
    const iteration = 1;
    ResponsesAPI.publishResponses(userID, iteration, localAnswer)
  }


  async function _nextQuestion() {
    if (currentIndex + 1 >= total) {
      props.onFinishedQuizz(givenAnswers);
    } else {
      questionTimer = Math.floor(Date.now() / 1000);
      setCurrentIndex(currentIndex + 1);
      setIsRightAnswer(false);
      setDisplayAnswer(!displayAnswer);
    }

    const userFeedback = {
      questionContentId: _currentQuestion.id,
      ...dataFeedback,
    };

    if (userFeedback.title || userFeedback.comment || userFeedback.isLiked) {
      FeedbacksAPI.sendFeedback(userFeedback);
      setDataFeedback({});
    }
  }


  const _displayAnswersButtons = question => {
    return (
      <>
        <AnswerButton
          questionKey="A"
          questionLabel={question.responses.response_A}
          onPress={() => _answerQuestion('A')}
        />
        <AnswerButton
          questionKey="B"
          questionLabel={question.responses.response_B}
          onPress={() => _answerQuestion('B')}
        />
        <AnswerButton
          questionKey="C"
          questionLabel={question.responses.response_C}
          onPress={() => _answerQuestion('C')}
        />
      </>
    );
  };

  function setFeedback(isLiked, title, comment) {
    setDataFeedback({
      isLiked: isLiked,
      comment: comment,
      title: title,
    });
  }

  if (_currentQuestion === undefined) {
    return <View style={{backgroundColor: '#FFF'}} />;
  }
  return (
    <ImageBackground
      imageStyle={{borderRadius: 7, backgroundColor: 'white'}}
      style={{width: '100%', height: '100%'}}
      source={
        _currentQuestion.image
          ? process.env.REACT_APP_API_URL + _currentQuestion.image.url
          : undefined
      }>
      <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
        <View
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 50,
            marginBottom: 40,
            alignSelf: 'center',
            height: '20%',
          }}>
          <Text style={Styles.questionText}>
            {_currentQuestion.text_question}
          </Text>
        </View>

        <View style={{paddingBottom: 50, height: '52%'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            {!displayAnswer && _displayAnswersButtons(_currentQuestion)}

            {displayAnswer && (
              <AnswerScreen
                isRightAnswer={isRightAnswer}
                question={_currentQuestion}
                lastTokenAmount={lastTokenAmount}
                setFeedback={setFeedback}
              />
            )}
          </View>
        </View>

        <View
          style={[
            {paddingBottom: 10},
            displayAnswer
              ? {}
              : {position: 'absolute', bottom: 5, width: '100%'},
          ]}>
          {displayAnswer && <NextButton onPress={_nextQuestion} />}

          <Text
            style={{
              marginTop: 0,
              textAlign: 'center',
              color: '#FFFFFF',
              fontSize: 18,
            }}>
            {currentIndex + 1} / {total}
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

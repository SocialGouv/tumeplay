import React from 'react';
import {TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import config from '../../../config';
import Text from '../../components/Text';
import wrong from '../../assets/Wrong.png';

const QuizzAnswerButton = props => {
  const {
    answer,
    onPress,
    name,
    correctAnswer,
    hasAnswered,
    answerTrou,
    disabled,
    index,
    selected,
  } = props;

  return (
    <TouchableOpacity
      style={answerTrou ? styles.buttonContainerTrou : styles.buttonContainer}
      disabled={disabled}
      onPress={onPress}
      name={name}>
      <View
        testID={
          answer.key === correctAnswer
            ? 'e2e-quizz-module-correct-answer'
            : 'e2e-quizz-module-wrong-answer'
        }
        style={[
          styles.button,
          hasAnswered && answer.key === correctAnswer && styles.correctAnswer,
          answerTrou ? styles.buttonTrou : '',
          hasAnswered &&
            answer.key !== correctAnswer &&
            index === selected &&
            styles.wrongAnswer,
        ]}>
        <Text
          style={[
            styles.value,
            hasAnswered && answer.key === correctAnswer && {fontWeight: '700'},
          ]}>
          {answer.value}
        </Text>
        {hasAnswered && answer.key !== correctAnswer && index === selected && (
          <Image style={styles.image} source={wrong} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainerTrou: {
    width: 250,
    alignSelf: 'center',
  },
  buttonContainer: {
    width: config.deviceWidth <= 375 ? '100%' : '50%',
    paddingHorizontal: config.deviceWidth <= 375 ? 0 : 10,
    alignSelf: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    marginVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: config.deviceWidth <= 375 ? 50 : 80,
    backgroundColor: '#F2E9DF',
  },
  buttonTrou: {
    height: config.deviceWidth <= 375 ? 50 : 60,
  },
  correctAnswer: {
    borderColor: '#51B070',
    borderWidth: 1,
    backgroundColor: '#DDF4ED',
    fontWeight: '600',
  },
  wrongAnswer: {
    backgroundColor: '#FFF',
  },
  value: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: config.deviceWidth * 0.04,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  image: {
    marginLeft: 10,
    width: 10,
    height: 10,
  },
});

export default QuizzAnswerButton;

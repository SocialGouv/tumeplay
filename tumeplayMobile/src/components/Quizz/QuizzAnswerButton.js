import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import config from '../../../config';
import Text from '../../components/Text';

const QuizzAnswerButton = props => {
  const {
    answer,
    onPress,
    name,
    correctAnswer,
    hasAnswered,
    answerTrou,
    answeredKey,
    disabled,
  } = props;

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} name={name}>
      <View
        style={[
          styles.button,
          hasAnswered && answer.key === correctAnswer
            ? styles.correctAnswer
            : '',
          answerTrou ? styles.buttonTrou : '',
          hasAnswered && answeredKey === answer.key && styles.wrongAnswer,
          hasAnswered && answer.key === correctAnswer && styles.correctAnswer,
        ]}>
        <Text
          style={[
            styles.value,
            hasAnswered && answer.key === correctAnswer && {fontWeight: '700'},
            answerTrou ? styles.valueTrou : '',
          ]}>
          {answer.value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    minWidth: config.deviceWidth <= 375 ? '100%' : 180,
    maxWidth: config.deviceWidth <= 375 ? '100%' : 180,
    marginVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: config.deviceWidth <= 375 ? 50 : 80,
    backgroundColor: '#F3E1E8',
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
    color: Colors.black,
    textAlign: 'center',
  },
  valueTrou: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emoji: {
    justifyContent: 'center',
  },
});

export default QuizzAnswerButton;

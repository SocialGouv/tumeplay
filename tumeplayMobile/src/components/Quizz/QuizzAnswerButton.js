import React from 'react';
import {TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import config from '../../../config';
import Text from '../../components/Text';
import right from '../../assets/Right.png';
import wrong from '../../assets/Wrong.png';

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
    <TouchableOpacity
      style={answerTrou ? styles.buttonContainerTrou : styles.buttonContainer}
      disabled={disabled}
      onPress={onPress}
      name={name}>
      <View
        style={[
          styles.button,
          hasAnswered && answer.key === correctAnswer && styles.correctAnswer,
          answerTrou ? styles.buttonTrou : '',
          hasAnswered && answer.key !== correctAnswer && styles.wrongAnswer,
          hasAnswered && answer.key === correctAnswer && styles.correctAnswer,
        ]}>
        <Text
          style={[
            styles.value,
            hasAnswered && answer.key === correctAnswer && {fontWeight: '700'},
          ]}>
          {answer.value}
        </Text>
        {hasAnswered &&
          answer.key === correctAnswer &&
          answeredKey === correctAnswer && (
            <Image source={right} style={styles.image} />
          )}
        {hasAnswered && answer.key !== correctAnswer && (
          <Image source={wrong} style={styles.image} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainerTrou: {
    width: 250,
  },
  buttonContainer: {
    width: config.deviceWidth <= 375 ? '100%' : '50%',
    paddingHorizontal: config.deviceWidth <= 375 ? 0 : 10,
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
    alignSelf: 'center',
    marginLeft: 10,
  },
});

export default QuizzAnswerButton;

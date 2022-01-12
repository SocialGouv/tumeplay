import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {Colors} from '../../styles/Style';

const QuizzAnswerButton = props => {
  const {answer, onPress, name, correctAnswer, hasAnswered, disabled} = props;
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} name={name}>
      <View
        style={[
          styles.button,
          hasAnswered && answer.key === correctAnswer
            ? styles.correctAnswer
            : '',
        ]}>
        <Text
          style={[
            styles.value,
            hasAnswered && answer.key === correctAnswer
              ? styles.correctAnswer
              : '',
          ]}>
          {answer.value}
        </Text>
        {hasAnswered ? (
          answer.key === correctAnswer ? (
            <Text style={styles.emoji}>✅</Text>
          ) : (
            <Text style={styles.emoji}>❌</Text>
          )
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 180,
    maxWidth: 180,
    marginVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#F3E1E8',
  },
  correctAnswer: {
    backgroundColor: '#fff',
    fontWeight: '600',
  },
  value: {
    justifyContent: 'center',
    color: Colors.black,
    paddingRight: 10,
  },
  emoji: {
    justifyContent: 'center',
  },
});

export default QuizzAnswerButton;

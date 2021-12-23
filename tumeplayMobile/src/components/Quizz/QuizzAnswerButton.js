import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

const QuizzAnswerButton = props => {
  const {answer, onPress, name, correctAnswer, hasAnswered, disabled} = props;
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} name={name}>
      <View style={styles.button}>
        <Text style={styles.value}>{answer.value}</Text>
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
    maxWidth: 160,
    minWidth: 160,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#F3E1E8',
  },
  value: {
    justifyContent: 'center',
  },
  emoji: {
    justifyContent: 'center',
  },
});

export default QuizzAnswerButton;

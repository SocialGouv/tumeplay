import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

const QuizzAnswerButton = props => {
  const {answer, onPress, name, correctAnswer, hasAnswered} = props;
  return (
    <TouchableOpacity onPress={onPress} name={name}>
      <View style={styles.button}>
        <Text>{answer.value}</Text>
        {hasAnswered ? (
          answer.key === correctAnswer ? (
            <Text>✅</Text>
          ) : (
            <Text>❌</Text>
          )
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 160,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#F3E1E8',
  },
});

export default QuizzAnswerButton;

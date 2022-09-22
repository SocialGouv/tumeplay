import {View, StyleSheet, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import config from '../../../config';
import {Colors} from '../../styles/Style';

const Grid = props => {
  const {
    gridSpecs,
    wordToGuess,
    inputWord,
    currentRow,
    userGuesses,
    isSuccess,
  } = props;

  const [userGuessesStatus, setUserGuessesStatus] = useState([]);

  const checkWords = useCallback(() => {
    const infos = userGuesses.map(word => {
      const redLetters = word
        .split('')
        .map((letter, index) => {
          return {
            index: index,
            letter: letter,
            isRed: letter === wordToGuess.charAt(index),
          };
        })
        .filter(letter => letter.isRed);
      return word.split('').map((letter, _index) => {
        if (
          !!redLetters.find(
            redLetter =>
              redLetter.index === _index && redLetter.letter === letter,
          )
        ) {
          return {
            letter: letter,
            status: 'red',
          };
        } else if (wordToGuess.includes(letter)) {
          if (!redLetters.find(redLetter => redLetter.letter === letter)) {
            return {
              letter: letter,
              status: 'yellow',
            };
          }
        }
        return {
          letter: letter,
          status: Colors.background,
        };
      });
    });
    setUserGuessesStatus(infos);
  }, [userGuesses, wordToGuess]);

  useEffect(() => {
    checkWords();
  }, [userGuesses, checkWords]);

  const adjustCellStyle = el => {
    let style = {
      width: '97%',
      height: '97%',
      textAlign: 'center',
      paddingVertical: 10,
      overflow: 'hidden',
      fontWeight: 'bold',
    };
    if (el.status === 'red') {
      style = {...style, backgroundColor: '#E85439', color: 'white'};
    } else if (el.status === 'yellow') {
      style = {
        ...style,
        backgroundColor: '#F1B931',
        color: 'black',
        borderRadius: 20,
      };
    }
    return style;
  };

  const finishStyle = {
    width: '97%',
    height: '97%',
    textAlign: 'center',
    paddingVertical: 10,
    overflow: 'hidden',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#E85439',
  };

  const renderGrid = () => {
    const tmpGrid = [];
    for (let i = 0; i < gridSpecs.columns; i++) {
      const row = [];
      for (let j = 0; j < gridSpecs.rows; j++) {
        row.push(
          <View
            key={j}
            style={[
              styles.cell,
              {width: (config.deviceWidth - 40) / wordToGuess.length + 1},
            ]}>
            {j < currentRow &&
              userGuessesStatus[j] &&
              userGuessesStatus[j][i] && (
                <Text style={adjustCellStyle(userGuessesStatus[j][i])}>
                  {userGuessesStatus[j][i].letter}
                </Text>
              )}
            {currentRow === j && (
              <Text style={isSuccess && finishStyle}>{inputWord[i]}</Text>
            )}
          </View>,
        );
      }
      tmpGrid.push(
        <View key={i} style={styles.gridRow}>
          {row}
        </View>,
      );
    }
    return tmpGrid;
  };

  return <View style={styles.grid}>{renderGrid()}</View>;
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
  },
  cell: {
    height: 40,
    border: 'solid',
    borderWidth: 0.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Grid;

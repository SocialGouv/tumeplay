import {View, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import config from '../../../config';

const Grid = props => {
  const {gridSpecs, wordToGuess, inputWord, currentRow, userGuesses} = props;

  const [userGuessesStatus, setUserGuessesStatus] = useState([]);

  const checkWords = () => {
    const infos = userGuesses.map((word, index) => {
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
      return word.split('').map((letter, index) => {
        if (
          !!redLetters.find(
            redLetter =>
              redLetter.index === index && redLetter.letter === letter,
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
          status: 'white',
        };
      });
    });
    console.log(infos);
    setUserGuessesStatus(infos);
  };

  useEffect(() => {
    console.log('USEEFFECT');
    checkWords();
  }, [userGuesses]);

  // const evalLetterStatus = (letter, index) => {
  //   console.log('Word to guess', wordToGuess);
  //   console.log(wordToGuess.charAt(index) === letter);
  //   if (wordToGuess.charAt(index) === letter) {

  //     return <Text style={{backgroundColor: 'red'}}>{letter}</Text>;
  //   } else if (wordToGuess) {
  //     return <Text style={{backgroundColor: 'yellow'}}>{letter}</Text>;
  //   }
  // };

  // const displayLetter = (i, j) => {
  //   if (j === currentRow) {
  //     return inputWord[i];
  //   } else if (j < currentRow) {
  //     return evalLetterStatus(userGuesses[j].charAt(i), i);
  //   } else {
  //     return '';
  //   }
  // };

  const renderGrid = () => {
    const tmpGrid = [];
    console.log('inrender', userGuessesStatus);
    for (let i = 0; i < gridSpecs.columns; i++) {
      const row = [];
      for (let j = 0; j < gridSpecs.rows; j++) {
        row.push(
          <View key={j} style={styles.cell}>
            {j < currentRow &&
              userGuessesStatus[j] &&
              userGuessesStatus[j][i] && (
                <Text style={{backgroundColor: userGuessesStatus[j][i].status}}>
                  {userGuessesStatus[j][i].letter}
                </Text>
              )}
            {currentRow === j && <Text>{inputWord[i]}</Text>}
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
    width: (config.deviceWidth - 40) / 9,
    height: 40,
    border: 'solid',
    borderWidth: 0.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Grid;

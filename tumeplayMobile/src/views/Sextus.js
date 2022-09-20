import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Container from '../components/global/Container';
import Icon from 'react-native-vector-icons/Entypo';
import Grid from '../components/Sextus/Grid';
import Keyboard from '../components/Sextus/Keyboard';
import {Colors} from '../styles/Style';
import Validation from '../components/Sextus/Validation';
import {useQuery} from '@apollo/client';
import {GET_SEXTUS_WORDS} from '../services/api/sextus';
const Sextus = ({navigation}) => {
  const [fullWords, setFullWords] = useState([]);
  const [inputWord, setInputWord] = useState('');
  const [wordToGuess, setWordToGuess] = useState('');
  const [definition, setDefinition] = useState('');
  const [userGuesses, setUserGuesses] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [globalRedLetterIndexes, setGlobalRedLetterIndexes] = useState([]);
  const [isAllowedToPlay, setIsAllowedToPlay] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const gridSpecs = {
    rows: 6,
    columns: wordToGuess.length,
  };

  const {data, loading} = useQuery(GET_SEXTUS_WORDS);

  const relaunchGame = useCallback(() => {
    setIsSuccess(false);
    setUserGuesses([]);
    setCurrentRow(0);
    setGlobalRedLetterIndexes([]);
    setInputWord('');
    handleWordAndDefinition();
    setIsAllowedToPlay(true);
  }, [wordToGuess]);

  const handleWordAndDefinition = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * fullWords.length);

    if (fullWords.length > 1) {
      setWordToGuess(fullWords[randomIndex].word.toUpperCase());
      setDefinition(fullWords[randomIndex].definition);
    }
  }, [fullWords]);

  useEffect(() => {
    handleWordAndDefinition();
  }, [handleWordAndDefinition]);

  useEffect(() => {
    setInputWord(wordToGuess.charAt(0).toUpperCase());
  }, [wordToGuess]);

  useEffect(() => {
    if (data && !loading) {
      setFullWords(data.sextusWords);
    }
  }, [data, loading]);

  useEffect(() => {
    const infos = userGuesses
      .map((word, _index) => {
        return word
          .split('')
          .map((letter, index) => {
            return {
              index: index,
              isRed: letter === wordToGuess.charAt(index),
            };
          })
          .filter(letter => letter.isRed);
      })
      .flat()
      .filter((value, index, self) => self.indexOf(value) === index);
    setGlobalRedLetterIndexes([...new Set(infos.map(item => item.index))]);
  }, [userGuesses]);

  const evaluateUserGuess = guess => {
    if (guess === wordToGuess) {
      setGlobalRedLetterIndexes([
        ...wordToGuess.split('').map((_, index) => index),
      ]);
      setIsSuccess(true);
      setIsAllowedToPlay(false);
    } else {
      if (currentRow + 1 < gridSpecs.rows) {
        setUserGuesses([...userGuesses, guess]);
        setCurrentRow(currentRow + 1);
        setInputWord(wordToGuess.charAt(0).toUpperCase());
      } else {
        setIsSuccess(false);
        setIsAllowedToPlay(false);
      }
    }
  };

  const onKeyPress = useCallback(
    key => {
      setGlobalRedLetterIndexes([]);
      if (key?.props?.name === 'backspace') {
        if (inputWord.length === 1) {
          setInputWord(wordToGuess.charAt(0).toUpperCase());
        } else {
          setInputWord(inputWord.slice(0, -1));
        }
      } else if (key?.props?.name === 'sign-in-alt') {
        evaluateUserGuess(inputWord);
      } else {
        inputWord.length + 1 <= wordToGuess.length &&
          setInputWord(inputWord + key);
      }
    },
    [inputWord],
  );

  return (
    <Container style={styles.container}>
      <View style={styles.backLevel}>
        <TouchableOpacity
          style={styles.chevron}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-small-left" size={25} color="#000" />
          <Text>Retour</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.title}>
          Trouve ce mot de{' '}
          <Text style={styles.redBoldText}>{wordToGuess.length}</Text> lettres
        </Text>
        <Grid
          userGuesses={userGuesses}
          currentRow={currentRow}
          gridSpecs={gridSpecs}
          wordToGuess={wordToGuess}
          inputWord={inputWord}
          globalRedLetterIndexes={globalRedLetterIndexes}
        />
        {isAllowedToPlay ? (
          <Keyboard onKeyPress={onKeyPress} />
        ) : (
          <Validation
            wordToGuess={wordToGuess}
            isSuccess={isSuccess}
            definition={definition}
            relaunchGame={relaunchGame}
          />
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingRight: 20,
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  chevron: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  keyboardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  redBoldText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default Sextus;

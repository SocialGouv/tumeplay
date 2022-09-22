import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Container from '../components/global/Container';
import Icon from 'react-native-vector-icons/Entypo';
import Grid from '../components/Sextus/Grid';
import Keyboard from '../components/Sextus/Keyboard';
import {Colors} from '../styles/Style';
import Validation from '../components/Sextus/Validation';
import {useQuery} from '@apollo/client';
import {GET_SEXTUS_WORDS} from '../services/api/sextus';
import Event from '../services/api/matomo';
import AppContext from '../../AppContext';

const Sextus = ({navigation}) => {
  const {user} = useContext(AppContext);

  const [fullWords, setFullWords] = useState([]);
  const [inputWord, setInputWord] = useState('');
  const [wordToGuess, setWordToGuess] = useState('');
  const [definition, setDefinition] = useState('');
  const [userGuesses, setUserGuesses] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
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
    setInputWord('');
    handleWordAndDefinition();
    setIsAllowedToPlay(true);
  }, [wordToGuess]);

  function getRandomInt(min, max) {
    const byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);

    const range = max - min + 1;
    const max_range = 256;
    if (byteArray[0] >= Math.floor(max_range / range) * range)
      return getRandomInt(min, max);
    return min + (byteArray[0] % range);
  }

  const handleWordAndDefinition = useCallback(() => {
    const randomIndex = getRandomInt(0, fullWords.length - 1);

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

  const evaluateUserGuess = guess => {
    if (guess === wordToGuess) {
      setIsSuccess(true);
      setIsAllowedToPlay(false);
    } else {
      if (currentRow + 1 < gridSpecs.rows) {
        setUserGuesses([...userGuesses, guess]);
        setCurrentRow(currentRow + 1);
        setInputWord(wordToGuess.charAt(0).toUpperCase());
      } else {
        Event.failSextusEvent('echec');
        setIsSuccess(false);
        setIsAllowedToPlay(false);
      }
    }
  };

  const onKeyPress = useCallback(
    key => {
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
          isSuccess={isSuccess}
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

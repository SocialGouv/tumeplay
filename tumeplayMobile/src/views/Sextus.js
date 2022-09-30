import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from '../components/Text';
import Container from '../components/global/Container';
import Icon from 'react-native-vector-icons/Entypo';
import Grid from '../components/Sextus/Grid';
import Keyboard from '../components/Sextus/Keyboard';
import {Colors} from '../styles/Style';
import Validation from '../components/Sextus/Validation';
import {useMutation, useQuery} from '@apollo/client';
import {
  CREATE_SEXTUS_HISTORY,
  GET_SEXTUS_WORDS,
  UPDATE_SEXTUS_HISTORY,
} from '../services/api/sextus';
import Event from '../services/api/matomo';
import AppContext from '../../AppContext';
import {REACT_APP_URL} from '@env';
import {removeAccentsWords} from '../services/utils';

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
  const [isWordValid, setIsWordValid] = useState(true);
  const [globalRedLetters, setGlobalRedLetters] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [currentHistoryId, setCurrentHistoryId] = useState(null);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const {data, loading} = useQuery(GET_SEXTUS_WORDS);
  const [createHistory, {data: data1}] = useMutation(CREATE_SEXTUS_HISTORY, {
    onError(error) {
      console.log('error on creation', error);
    },
    onCompleted() {
      setCurrentHistoryId(data1?.createSextusHistory?.sextusHistory?.id);
    },
  });

  const [updateHistory] = useMutation(UPDATE_SEXTUS_HISTORY, {
    onError(error) {
      console.log('error on update', error);
    },
    onCompleted() {
      setIsSuccess(true);
      setIsAllowedToPlay(false);
    },
  });

  const createUserHistory = async () => {
    if (wordToGuess !== '') {
      setStartDate(new Date().getTime());
      await createHistory({
        variables: {
          utilisateurs_mobile: user.id,
          word_to_guess: wordToGuess,
          nb_try: 0,
          duration: 0,
          status: 'fail',
        },
      });
    }
  };

  const updateUserHistory = async () => {
    const endDate = new Date().getTime();
    const duration = (endDate - startDate) / 1000;
    await updateHistory({
      variables: {
        history_id: currentHistoryId,
        nb_try: currentRow + 1,
        duration: duration,
        status: 'success',
      },
    });
  };

  const gridSpecs = {
    rows: 6,
    columns: wordToGuess.length,
  };

  const relaunchGame = useCallback(() => {
    setIsSuccess(false);
    setUserGuesses([]);
    setCurrentRow(0);
    setCurrentLetterIndex(0);
    setInputWord('');
    handleWordAndDefinition();
    setIsAllowedToPlay(true);
  }, [wordToGuess]);

  // function getRandomInt(min, max) {
  //   const byteArray = new Uint8Array(1);
  //   window.crypto.getRandomValues(byteArray);

  //   const range = max - min + 1;
  //   const max_range = 256;
  //   if (byteArray[0] >= Math.floor(max_range / range) * range)
  //     return getRandomInt(min, max);
  //   return min + (byteArray[0] % range);
  // }

  const handleWordAndDefinition = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * fullWords.length);

    if (fullWords.length > 1) {
      setWordToGuess(
        removeAccentsWords(fullWords[randomIndex].word.toUpperCase()),
      );
      setDefinition(fullWords[randomIndex].definition);
    }
  }, [fullWords]);

  useEffect(() => {
    handleWordAndDefinition();
  }, [handleWordAndDefinition]);

  useEffect(() => {
    createUserHistory();
    setInputWord(wordToGuess.charAt(0).toUpperCase());
  }, [wordToGuess]);

  useEffect(() => {
    if (data && !loading) {
      setFullWords(data.sextusWords);
    }
  }, [data, loading]);

  const evaluateUserGuess = guess => {
    if (guess === wordToGuess) {
      updateUserHistory();
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

  useEffect(() => {
    const infos = userGuesses
      .map((word, _index) => {
        return word
          .split('')
          .map((letter, index) => {
            return {
              letter: letter,
              index: index,
              isRed: letter === wordToGuess.charAt(index),
            };
          })
          .filter(letter => letter.isRed);
      })
      .flat()
      .filter((value, index, self) => self.indexOf(value) === index);
    setGlobalRedLetters([...new Set(infos.map(item => item.index))]);
  }, [userGuesses]);

  const onKeyPress = useCallback(
    key => {
      if (key?.props?.name === 'backspace') {
        if (inputWord.length === 1) {
          setCurrentLetterIndex(0);
          setInputWord(wordToGuess.charAt(0).toUpperCase());
        } else {
          setCurrentLetterIndex(currentLetterIndex - 1);
          setInputWord(inputWord.slice(0, -1));
        }
      } else if (key?.props?.name === 'sign-in-alt') {
        if (inputWord.length === wordToGuess.length) {
          fetch(
            `${REACT_APP_URL}/mots/count?value=${inputWord.toLowerCase()}`,
          ).then(response => {
            response.json().then(_data => {
              if (_data === 0) {
                setIsWordValid(false);
                setInputWord(wordToGuess.charAt(0).toUpperCase());
                setCurrentLetterIndex(0);
              } else {
                setIsWordValid(true);
                evaluateUserGuess(inputWord);
              }
            });
          });
          setCurrentLetterIndex(0);
        }
      } else {
        setGlobalRedLetters([]);
        if (inputWord.length + 1 <= wordToGuess.length) {
          setInputWord(inputWord + key);
          setCurrentLetterIndex(currentLetterIndex + 1);
        }
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
          isWordValid={isWordValid}
          globalRedLetters={globalRedLetters}
          currentLetterIndex={currentLetterIndex}
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

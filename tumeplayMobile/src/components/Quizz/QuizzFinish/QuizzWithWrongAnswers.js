import React, {useEffect, useContext} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import TopLevelPointIndicator from '../TopLevelPointIndicator';
import wave from '../../../assets/wave.png';
import congrats from '../../../assets/custom_images/congrats.png';
import clap from '../../../assets/custom_images/clap.png';
import coin from '../../../assets/coin.png';
import {Colors, Fonts} from '../../../styles/Style';
import Button from '../../Button';
import bg from '../../../assets/QuizzWrongBG.png';
import _ from 'lodash';
import AppContext from '../../../../AppContext';
import Container from '../../global/Container';

const QuizzWithWrongAnswers = props => {
  const {correctAnswers, wrongAnswers, navigation, pointsEarned, module_id} =
    props;

  const context = useContext(AppContext);
  const points = context.points;
  const setPoints = context.setPoints;
  const restartQuizz = () => {
    if (correctAnswers.length < 10) {
      navigation.navigate('QuizzModule', {
        questions: _.shuffle(wrongAnswers),
        module_id: module_id,
        retry: true,
      });
    }
  };

  useEffect(() => {
    setPoints(points + pointsEarned);
  }, []);

  return (
    <Container style={styles.container} background={bg}>
      <View style={styles.pointIndicatorContainer}>
        <TopLevelPointIndicator style={styles.levelIndicator} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>BRAVO !</Text>
        <Image source={wave} />
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>
          {' '}
          <Text style={styles.boldPoints}>+ {pointsEarned} </Text>
          points
        </Text>
        <Image source={coin} style={styles.coin} />
      </View>
      <Image source={congrats} />
      <View style={styles.answerContainer}>
        <Text style={[styles.answerText, styles.firstAnswer]}>
          ✅ {correctAnswers?.length}{' '}
          {correctAnswers.length > 1
            ? 'réponses correctes'
            : 'réponse correcte'}
        </Text>
        <Text style={styles.answerText}>
          ❌ {wrongAnswers?.length}{' '}
          {wrongAnswers.length > 1
            ? 'réponses incorrectes'
            : 'réponse incorrecte'}
        </Text>
      </View>
      <View style={styles.bottomTextContainer}>
        <Image source={clap} />
        <Text style={styles.bottomText}>
          Continue pour débloquer le niveau 1{' '}
        </Text>
      </View>
      <Button
        text={'Je continue'}
        size={'large'}
        style={styles.button}
        icon={true}
        onPress={() => restartQuizz()}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  pointIndicatorContainer: {
    justifyContent: 'flex-end',
    width: '100%',
    flexDirection: 'row',
  },
  levelIndicator: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.title,
    color: Colors.black,
    fontSize: 30,
    lineHeight: 38,
    paddingBottom: 5,
  },
  boldPoints: {
    fontFamily: Fonts.subtitle,
    fontSize: 22,
  },
  points: {
    fontFamily: Fonts.strongText,
    fontSize: 22,
    color: Colors.black,
  },
  coin: {
    width: 30,
    height: 30,
  },
  pointsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 180,
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 20,
  },
  answerContainer: {
    marginTop: 28,
    minWidth: 240,
    minHeight: 70,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  answerText: {
    fontSize: 18,
    color: Colors.black,
    lineHeight: 22,
  },
  firstAnswer: {
    paddingBottom: 10,
  },
  button: {
    position: 'absolute',
    bottom: 35,
  },
  bottomTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 110,
  },
  bottomText: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 18,
    paddingTop: 5,
  },
});

export default QuizzWithWrongAnswers;

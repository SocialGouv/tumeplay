import React, {useEffect, useContext} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Text from '../../../components/Text';
import TopLevelPointIndicator from '../TopLevelPointIndicator';
import wave from '../../../assets/wave.png';
import congrats from '../../../assets/custom_images/congrats.png';
import clap from '../../../assets/custom_images/clap.png';
import coin from '../../../assets/coin.png';
import {Fonts} from '../../../styles/Style';
import Button from '../../Button';
import bg from '../../../assets/QuizzWrongBG.png';
import _ from 'lodash';
import AppContext from '../../../../AppContext';
import Container from '../../global/Container';
import config from '../../../../config';

const QuizzWithWrongAnswers = props => {
  const {correctAnswers, wrongAnswers, navigation, module_id} = props;

  const context = useContext(AppContext);
  const restartQuizz = () => {
    console.log('length', correctAnswers.length);
    navigation.navigate('QuizzModule', {
      questions: _.shuffle(wrongAnswers),
      module_id: module_id,
      improveWrongAnswers: true,
    });
  };

  return (
    <Container style={styles.container} background={bg}>
      <View style={styles.pointIndicatorContainer}>
        <TopLevelPointIndicator style={styles.levelIndicator} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>BRAVO !</Text>
        <Image source={wave} />
      </View>
      <Image style={styles.congratsImg} source={congrats} />
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
          Complète le module en corrigeant tes mauvaises réponses
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

    fontSize: config.deviceWidth <= 375 ? 25 : 30,
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

    paddingRight: 10,
  },
  coin: {
    width: 30,
    height: 30,
  },
  pointsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: config.deviceWidth <= 375 ? 20 : 32,
    marginBottom: config.deviceWidth <= 375 ? 10 : 20,
  },
  answerContainer: {
    marginTop: config.deviceWidth <= 375 ? 12 : 28,
    minWidth: config.deviceWidth <= 375 ? 190 : 240,
    minHeight: 70,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  answerText: {
    fontSize: config.deviceWidth <= 375 ? 14 : 18,

    lineHeight: 22,
  },
  firstAnswer: {
    paddingBottom: 10,
  },
  button: {
    position: 'absolute',
    bottom: config.deviceWidth <= 375 ? 20 : 35,
  },
  bottomTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: config.deviceWidth <= 375 ? 80 : 110,
  },
  bottomText: {
    fontWeight: '600',
    fontSize: config.deviceWidth <= 375 ? 12 : 16,
    paddingTop: 5,
    textAlign: 'center',
  },
  congratsImg: {
    marginVertical: 40,
    width: config.deviceWidth <= 375 ? 40 : 70,
    height: config.deviceWidth <= 375 ? 40 : 70,
  },
});

export default QuizzWithWrongAnswers;

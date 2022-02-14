import React, {useContext, useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Text from '../components/Text';
import wave from '../assets/wave.png';
import gift from '../assets/custom_images/gift.png';
import {Fonts} from '../styles/Style';
import Button from '../components/Button';
import bg from '../assets/QuizzWrongBG.png';
import _ from 'lodash';
import Container from '../components/global/Container';
import config from '../../config';
import AppContext from '../../AppContext';
import {useNavigation} from '@react-navigation/native';

const Award = props => {
  const {user} = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <Container style={styles.container} background={bg}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>BRAVO !</Text>
        <Image source={wave} />
      </View>
      <View style={styles.middleContent}>
        {!user.hasFinished ? (
          <>
            <Text style={styles.textLevel}>
              Niveau {user.level - 1} terminé
            </Text>
            <Text style={styles.textAward}>Tu as gagné une récompense </Text>
            <Image style={styles.giftImg} source={gift} />
          </>
        ) : (
          <>
            <Text style={styles.textLevel}>Tu es un expert !</Text>
            <Text style={styles.textAward}>Tu as validé tous les niveaux</Text>
            <Text style={[styles.textAward, styles.textLevelsRange]}>
              (de 1 à 5 niveaux)
            </Text>
            <Text style={styles.question}>Que souhaites-tu faire ?</Text>
            <Button
              text={'Consulter les derniers contenus'}
              size={'large'}
              style={styles.buttonContent}
              onPress={() => {
                navigation.navigate('Home', {screen: 'Posts'});
              }}
            />
          </>
        )}
      </View>
      {!user.hasFinished ? (
        <Button
          text={'Je commande !'}
          size={'large'}
          style={styles.button}
          icon={true}
          onPress={() => {
            navigation.navigate('Home', {screen: 'Kit'});
          }}
        />
      ) : (
        <Button
          text="Rejouer"
          size="medium"
          icon
          special
          onPress={() => {
            navigation.navigate('Home', {screen: 'Parcours'});
          }}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 90,
  },
  middleContent: {
    alignItems: 'center',
    paddingTop: 40,
  },
  textLevel: {
    fontSize: 22,
    fontWeight: '700',
    paddingBottom: 20,
    lineHeight: 22,
    textAlign: 'center',
  },
  textAward: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 27,
    textAlign: 'center',
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
  button: {
    position: 'absolute',
    bottom: config.deviceWidth <= 375 ? 20 : 35,
  },
  buttonContent: {
    textAlign: 'center',
  },
  giftImg: {
    marginVertical: 40,
    width: config.deviceWidth <= 375 ? 40 : 70,
    height: config.deviceWidth <= 375 ? 40 : 70,
  },
  textLevelsRange: {
    paddingBottom: 34,
  },
  question: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
    textTransform: 'uppercase',
    paddingBottom: 16,
  },
});

export default Award;

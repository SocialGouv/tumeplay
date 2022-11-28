import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../styles/Color';
import Styles from '../styles/Styles';
import img from '../assets/onboardingAime.png';

const AimeOnboarding = ({onDone}) => {
  return (
    <View style={{flex: 1, height: '100%'}}>
      <Text style={styles.title}>Bienvenue sur Aime,</Text>
      <Text style={styles.subtitle}>
        L'application sur la santé sexuelle qui te permetde mieux comprendre ton
        corps et les relations amoureuses en France
      </Text>
      <Image source={img} style={styles.image} h={30} />
      <TouchableOpacity
        style={[Styles.tunnelButton, styles.button]}
        onPress={onDone}>
        <Text style={[Styles.tunnelButtonText, styles.buttonText]}>
          Continuer
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontFamily: Colors.appTitleFont,
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: Colors.titleCard,
    marginBottom: 30,
  },
  button: {
    width: 'fit-content',
    alignSelf: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  image: {
    marginBottom: 30,
  },
});

export default AimeOnboarding;

import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import config from '../../../config';
import Button from '../Button';

const Validation = props => {
  const {wordToGuess, isSuccess, definition} = props;

  const AnimatedView = Animatable.createAnimatableComponent(View);

  return (
    <AnimatedView
      animation="fadeInUp"
      duration={550}
      easing="ease-in-out"
      style={[styles.bottomContainer]}>
      {isSuccess ? (
        <Text style={styles.title}>🎉 Bien joué !</Text>
      ) : (
        <Text style={styles.title}>😞 Perdu !</Text>
      )}
      <Text style={styles.subtitle}>{wordToGuess}</Text>
      <Text>{definition}</Text>
      <Button size="medium" text="Rejouer" icon={true} style={styles.button} />
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    width: config.deviceWidth,
    backgroundColor: '#FFF',
    flex: 0.7,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: 'center',
    // paddingBottom: 70,
  },
  title: {
    fontSize: config.deviceWidth * 0.05,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: config.deviceWidth * 0.04,
    marginBottom: 20,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  button: {
    position: 'absolute',
    bottom: 40,
  },
});

export default Validation;

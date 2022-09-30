import {ScrollView, View, StyleSheet} from 'react-native';
import Text from '../Text';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import config from '../../../config';
import Button from '../Button';

const Validation = props => {
  const {wordToGuess, isSuccess, definition, relaunchGame} = props;

  const AnimatedView = Animatable.createAnimatableComponent(View);

  return (
    <AnimatedView
      animation="fadeInUp"
      duration={550}
      easing="ease-in-out"
      style={[styles.bottomContainer]}>
      <ScrollView>
        <View style={styles.textContainer}>
          {isSuccess ? (
            <Text style={styles.title}>Bien joué ! 🎉</Text>
          ) : (
            <Text style={styles.title}>Perdu ! 😞</Text>
          )}
          <Text style={styles.subtitle}>{wordToGuess}</Text>
          <Text>{definition[0].toUpperCase() + definition.substring(1)}</Text>
        </View>
      </ScrollView>
      <Button
        size="medium"
        text="Rejouer"
        icon={true}
        style={styles.button}
        onPress={() => relaunchGame()}
      />
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    width: config.deviceWidth,
    backgroundColor: '#FFF',
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 20,
    // alignItems: 'center',
    // paddingBottom: 70,
  },
  textContainer: {
    flex: 1,
    marginBottom: 20,
    alignItems: 'center',
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
    // position: 'absolute',
    bottom: 20,
  },
});

export default Validation;

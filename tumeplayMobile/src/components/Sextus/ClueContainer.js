import {StyleSheet, View, Image} from 'react-native';
import Text from '../Text';
import React from 'react';
import config from '../../../config';
import sparkles from '../../assets/MaterialButton.png';
import * as Animatable from 'react-native-animatable';
import Button from '../Button';

const ClueContainer = ({clue, setDisplayClue}) => {
  return (
    <Animatable.View style={styles.clueBox} animation="fadeInUp">
      <View style={styles.topContainer}>
        <Image source={sparkles} style={styles.image} />
        <Text style={styles.title}>Mot à trouver : </Text>
      </View>
      <Text>{clue}</Text>
      <Button
        size="intermediate"
        style={styles.button}
        text="Je tente ma chance"
        icon
        onPress={() => setDisplayClue(false)}
      />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  clueBox: {
    width: config.deviceWidth,
    flex: 1,
    backgroundColor: '#FFF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 20,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 40,
    height: 40,
  },
  topContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: config.deviceWidth * 0.05,
    marginTop: 10,
    fontWeight: 'bold',
  },
  button: {
    marginBottom: 30,
  },
});

export default ClueContainer;

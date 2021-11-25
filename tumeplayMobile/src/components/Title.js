import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import wave from '../assets/wave.png';
import {Colors, Fonts} from '../styles/Style';

const Title = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Hello</Text>
      <Image source={wave} />
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: Fonts.title,
    lineHeight: 38,
    color: Colors.black,
  },
});

export default Title;

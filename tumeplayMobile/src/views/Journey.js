import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import wave from '../assets/wave.png';
import WrapperLevelBadges from '../components/Journey/WrapperLevelBadges';
import LevelPointsIndicator from '../components/LevelPointsIndicator';
import {Fonts} from '../styles/Style';

const Journey = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ton parcours</Text>
      <Image source={wave} />
      <LevelPointsIndicator points={'500'} style={styles.pointContainer} />
      <ScrollView>
        <WrapperLevelBadges />
        <WrapperLevelBadges />
        <WrapperLevelBadges />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    paddingVertical: 21,
  },
  title: {
    fontFamily: Fonts.title,
    fontSize: 28,
    lineHeight: 38,
  },
  pointContainer: {
    marginVertical: 18,
  },
});

export default Journey;

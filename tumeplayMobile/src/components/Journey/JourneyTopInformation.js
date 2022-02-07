import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Fonts} from '../../styles/Style';

const JourneyTopInformation = ({level}) => {
  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{level.name}</Text>
        <Text style={styles.text}>0 / 3000</Text>
      </View>
      <View style={styles.border} />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: Fonts.strongText,
    fontSize: 16,
    lineHeight: 26,
  },
  border: {
    borderBottomWidth: 1,
    marginTop: 5,
    borderBottomColor: '#EAE2D7',
  },
});

export default JourneyTopInformation;

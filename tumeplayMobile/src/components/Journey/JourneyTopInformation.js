import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../../components/Text';

const JourneyTopInformation = ({level}) => {
  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{level.name.toUpperCase()}</Text>
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
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 26,
  },
  border: {
    borderBottomWidth: 1,
    marginTop: 5,
    borderBottomColor: '#EAE2D7',
    marginBottom: 10,
  },
});

export default JourneyTopInformation;

import {View, StyleSheet} from 'react-native';
import Text from '../Text';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SponsorshipTextInfos = () => {
  return (
    <View style={styles.container}>
      <Icon name="redeem" size={50} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Parraine tes amis</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  textContainer: {
    alignContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  icon: {
    marginTop: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 5,
    marginTop: 25,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default SponsorshipTextInfos;

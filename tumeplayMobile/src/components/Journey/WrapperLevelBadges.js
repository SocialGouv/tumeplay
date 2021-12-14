import React from 'react';
import {View, StyleSheet} from 'react-native';
import Badge from './Badge';
import JourneyTopInformation from './JourneyTopInformation';

const WrapperLevelBadges = () => {
  return (
    <View style={styles.container}>
      <JourneyTopInformation />
      <View style={styles.badgeWrapper}>
        <Badge />
        <Badge />
        <Badge />
        <Badge />
        <Badge />
        <Badge />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
  },
  badgeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default WrapperLevelBadges;

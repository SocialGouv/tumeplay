import React from 'react';
import {View, StyleSheet} from 'react-native';
import Badge from './Badge';
import JourneyTopInformation from './JourneyTopInformation';

const WrapperLevelBadges = ({level, associatedModules}) => {
  const modulesToDisplay = associatedModules?.map(module => {
    return <Badge key={module.id} module={module} />;
  });

  return (
    <View style={styles.container}>
      <JourneyTopInformation level={level} />
      <View style={styles.badgeWrapper}>{modulesToDisplay}</View>
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
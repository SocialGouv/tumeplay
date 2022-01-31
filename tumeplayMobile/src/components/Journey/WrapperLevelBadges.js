import React from 'react';
import {View, StyleSheet} from 'react-native';
import BadgesSkeleton from '../global/SkeletonDesign/BadgesSkeleton';
import Badge from './Badge';
import JourneyTopInformation from './JourneyTopInformation';

const WrapperLevelBadges = ({level, associatedModules, loading}) => {
  const modulesToDisplay = associatedModules?.map(module => {
    return <Badge key={module.id} module={module} />;
  });

  //use to generate a fake line for skeleton design
  const array = [0, 1, 2];

  const skeletonBadges = array.map((_, index) => (
    <BadgesSkeleton key={index} />
  ));

  return (
    <View style={styles.container}>
      <JourneyTopInformation level={level} />
      <View style={styles.badgeWrapper}>
        {loading ? skeletonBadges : modulesToDisplay}
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

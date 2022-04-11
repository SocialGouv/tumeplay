import React, {useContext} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Text from '../../components/Text';
import AppContext from '../../../AppContext';
import BadgesSkeleton from '../global/SkeletonDesign/BadgesSkeleton';
import Badge from './Badge';
import JourneyTopInformation from './JourneyTopInformation';
import {REACT_APP_URL} from '@env';
import config from '../../../config';
const WrapperLevelBadges = ({level, associatedModules, loading}) => {
  const {doneModules_ids} = useContext(AppContext);

  const modulesToDisplay = associatedModules?.map((module, index) => {
    if (module.module_index < doneModules_ids.length) {
      module.status = 'done';
    } else if (module.module_index === doneModules_ids.length) {
      module.status = 'todo';
    } else {
      module.status = 'locked';
    }
    if (
      (level.value === 1 || level.value === 3 || level.value === 5) &&
      index + 1 === associatedModules.length
    ) {
      module.reward = true;
    }
    return (
      <View key={module.id}>
        <Badge
          key={module.id}
          module={module}
          module_index={module.module_index}
          status={module.status}
        />
        <View style={styles.textContainer}>
          <Image
            source={{uri: REACT_APP_URL + module?.thematique?.image?.url}}
            style={{width: 20, height: 20, marginLeft: 15}}
          />
          <Text style={styles.textDescription}>{module?.title}</Text>
        </View>
      </View>
    );
  });

  //use to generate a fake line for skeleton design
  const array = [0, 1, 2, 3];

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
    justifyContent: 'flex-start',
  },
  textContainer: {
    flexDirection: 'row',
    textAlignVertical: 'center',
    alignItems: 'center',
  },
  textDescription: {
    width: 85,
    fontSize: config.deviceWidth * 0.026,
    fontWeight: '700',
    paddingHorizontal: 5,
    alignSelf: 'center',
  },
});

export default WrapperLevelBadges;

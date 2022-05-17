import {View, StyleSheet} from 'react-native';
import TextBase from '../../Text';
import React from 'react';

import ModuleDifficultyBadge from './ModuleDifficultyBadge';
import config from '../../../../config';

const ModuleLine = ({module, index}) => {
  return (
    <View style={styles.line}>
      <View style={styles.round} />
      <TextBase>{module?.title}</TextBase>
      <ModuleDifficultyBadge level={module?.niveau?.value} />
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    display: 'flex',
    flexDirection: 'row',
    width: config.deviceWidth * 0.9,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  round: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: '#51B070',
  },
});

export default ModuleLine;

import {View, Text} from 'react-native';
import React from 'react';

const ModuleDifficultyBadge = ({level}) => {
  const displayLevelIndicator = () => {
    for (let i = 0; i === level; i++) {
      console.log(level);
    }
  };

  return (
    <View>
      <Text>{level}</Text>
    </View>
  );
};

export default ModuleDifficultyBadge;

import {View} from 'react-native';
import TextBase from '../Text';
import React from 'react';

const ModuleLine = ({module, index}) => {
  return (
    <View>
      <TextBase>{module.title}</TextBase>
    </View>
  );
};

export default ModuleLine;

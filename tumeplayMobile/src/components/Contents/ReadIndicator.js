import {View, StyleSheet} from 'react-native';
import TextBase from '../Text';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

const ReadIndicator = props => {
  const {style, backgroundColor} = props;
  return (
    <View
      style={[
        style,
        styles.indicator,
        {backgroundColor: backgroundColor, borderColor: backgroundColor},
      ]}>
      <Icon name="eye" style={styles.icon} />
      <TextBase>Déjà vu</TextBase>
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    borderWidth: 1,
    padding: 5,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    paddingRight: 5,
  },
});

export default ReadIndicator;

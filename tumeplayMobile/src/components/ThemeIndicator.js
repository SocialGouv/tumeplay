import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import TextBase from './Text';
import {REACT_APP_URL} from '@env';

const ThemeIndicator = props => {
  const {theme} = props;

  return (
    <View style={[styles.container, {backgroundColor: theme?.color}]}>
      <Image
        source={{uri: `${REACT_APP_URL}${theme?.image?.url}`}}
        style={{width: 30, height: 30}}
      />
      <TextBase>{theme?.title}</TextBase>
    </View>
  );
};

export default ThemeIndicator;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
});

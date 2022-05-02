import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {REACT_APP_URL} from '@env';

const ThemePicker = props => {
  const {theme} = props;

  return (
    <TouchableOpacity
      style={[styles.roundedView, {backgroundColor: theme?.color}]}>
      <Image
        source={{uri: REACT_APP_URL + theme?.image?.url}}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundedView: {
    width: 70,
    height: 70,
    borderRadius: 50,
    border: 8,
    borderColor: '#C6C6FE',
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    position: 'absolute',
    bottom: 0,
    right: 40,
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default ThemePicker;

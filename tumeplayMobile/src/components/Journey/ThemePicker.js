import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {REACT_APP_URL} from '@env';

const ThemePicker = props => {
  const {theme, index, selectedIndex, length, onPress} = props;
  const isSelected =
    selectedIndex === length - 1 ? index === 0 : selectedIndex + 1 === index;

  return (
    <>
      <TouchableOpacity
        disabled={!isSelected}
        onPress={onPress}
        activeOpacity={0.95}
        style={[
          styles.roundedView,
          {
            backgroundColor: theme?.color,
            borderColor: isSelected ? '#000' : '#C6C6FE',
          },
        ]}>
        <Image
          source={{uri: REACT_APP_URL + theme?.image?.url}}
          style={styles.image}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  roundedView: {
    width: 70,
    height: 70,
    borderRadius: 50,
    border: 8,
    borderWidth: 6,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '90deg'}],
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default ThemePicker;

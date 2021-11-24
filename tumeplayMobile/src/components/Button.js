import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Fonts} from '../styles/Style';

const Button = props => {
  const {size, text, icon, isDisabled, onPress} = props;

  const adjustStyle = () => {
    switch (size) {
      case 'large':
        return styles.longPressable;
      case 'medium':
        return styles.mediumPressable;
      case 'small':
        return styles.smallPressable;
    }
  };
  return (
    <TouchableOpacity
      style={[adjustStyle()]}
      disabled={isDisabled}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  longPressable: {
    width: 350,
    height: 55,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#FFF',
  },
  mediumPressable: {
    width: 150,
    height: 35,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#FFF',
  },
  smallPressable: {
    width: 70,
    height: 35,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#FFF',
  },
  text: {
    color: '#FFF',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: Fonts.strongText,
  },
});

export default Button;

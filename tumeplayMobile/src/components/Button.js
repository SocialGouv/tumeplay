import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {Fonts} from '../styles/Style';
import arrow from '../assets/Arrow.png';

const Button = props => {
  const {size, text, icon, isDisabled, onPress, style} = props;

  const adjustStyle = () => {
    switch (size) {
      case 'large':
        return styles.longPressable;
      case 'intermediate':
        return styles.intermediataPressable;
      case 'medium':
        return styles.mediumPressable;
      case 'small':
        return styles.smallPressable;
    }
  };
  return (
    <TouchableOpacity
      style={[adjustStyle(), style]}
      disabled={isDisabled}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
      {icon && <Image source={arrow} style={styles.icon} />}
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
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  intermediataPressable: {
    width: 275,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#FFF',
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  mediumPressable: {
    width: 150,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#FFF',
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  smallPressable: {
    width: 70,
    height: 35,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#FFF',
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  text: {
    color: '#FFF',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: Fonts.strongText,
  },
  icon: {
    marginLeft: 8,
  },
});

export default Button;

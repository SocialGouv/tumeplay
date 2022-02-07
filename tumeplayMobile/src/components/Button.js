import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {Fonts} from '../styles/Style';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../../config';

const Button = props => {
  const {size, text, icon, isDisabled, onPress, style, styleText} = props;

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
      accessibilityRole="button"
      onPress={onPress}>
      <Text style={[styles.text, styleText]}>{text}</Text>
      {icon && (
        <Icon
          name="md-arrow-forward"
          size={22}
          color="#fff"
          style={styles.icon}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  longPressable: {
    width: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#FFF',
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    padding: config.deviceWidth * 0.04,
  },
  intermediataPressable: {
    width: 290,
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
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#FFF',
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    fontSize: 16,
    paddingHorizontal: 20,
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
    fontSize: config.deviceWidth * 0.045,
    lineHeight: 24,
    fontFamily: Fonts.strongText,
    fontWeight: '600',
    letterSpacing: 0.6,
    marginRight: 10,
  },
  icon: {
    marginLeft: 8,
  },
});

export default Button;

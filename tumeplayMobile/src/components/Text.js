import React from 'react';
import {Text, StyleSheet} from 'react-native';

const TextBase = ({children, props, style}) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});

export default TextBase;

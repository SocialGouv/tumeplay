import React from 'react';
import {Text, StyleSheet} from 'react-native';

const TextBase = ({children, props, style, numberOfLines}) => {
  return (
    <Text style={[styles.text, style]} {...props} numberOfLines={numberOfLines}>
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

import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Button from '../Button';

const Snackbar = props => {
  const {text, onPress} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Button
        special
        style={styles.button}
        icon
        left
        text=""
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 30,
    backgroundColor: '#000',
    width: '90%',
    height: 75,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  text: {
    width: '70%',
    color: '#FFF',
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    width: 55,
    maxHeight: 55,
    alignItems: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 14,
  },
});

export default Snackbar;

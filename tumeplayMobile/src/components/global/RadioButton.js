import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';

const RadioButton = ({selected, text, onPress}) => {
  const isSelectedStyle = {
    padding: 5,
    borderColor: '#000',
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.round, isSelectedStyle]}
        onPress={onPress}>
        {selected && <View style={styles.innerCircle} />}
      </TouchableOpacity>
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
  },
  round: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: '#000',
  },
  text: {
    paddingHorizontal: 10,
  },
});

export default RadioButton;

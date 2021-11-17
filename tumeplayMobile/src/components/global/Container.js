import React from 'react';
import {View, StyleSheet, Platform, SafeAreaView} from 'react-native';

const Container = ({children}) => {
  const displayContainer =
    Platform.OS === 'ios' ? (
      <SafeAreaView style={style.container}>{children}</SafeAreaView>
    ) : (
      <View style={style.container}>{children}</View>
    );

  return displayContainer;
};

const style = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#FFF',
  },
});

export default Container;

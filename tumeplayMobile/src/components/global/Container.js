import React from 'react';
import {View, StyleSheet, Platform, Dimensions} from 'react-native';

const Container = ({children}) => {
  const displayContainer =
    Platform.OS === 'ios' ? (
      <View style={styles.container}>{children}</View>
    ) : (
      <View style={styles.container}>{children}</View>
    );

  return displayContainer;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
});

export default Container;

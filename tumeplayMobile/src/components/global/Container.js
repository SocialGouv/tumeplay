import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';

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
    paddingTop: Platform.OS === 'ios' ? 40 : 2,
  },
});

export default Container;

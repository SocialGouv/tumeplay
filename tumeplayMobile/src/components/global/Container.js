import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ImageBackground,
  Dimensions,
} from 'react-native';

const Container = ({children, background, style}) => {
  const displayContainer =
    Platform.OS === 'ios' ? (
      <ImageBackground source={background} style={[styles.container, style]}>
        {children}
      </ImageBackground>
    ) : (
      <ImageBackground style={[styles.container, style]}>
        {children}
      </ImageBackground>
    );

  return displayContainer;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Platform.OS === 'ios' && Dimensions.get('window').width > 375 ? 40 : 20,
    height: '100%',
  },
});

export default Container;

import React from 'react';

import {
  View,
  StyleSheet,
  Platform,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {Colors} from '../../styles/Style';


const Container = ({children, background, style}) => {
  const displayContainer = (
    <ImageBackground source={background} style={[styles.container, style]}>
      {children}
    </ImageBackground>
  );

  return displayContainer;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Platform.OS === 'ios' && Dimensions.get('window').width > 375 ? 40 : 25,
    height: '100%',
    backgroundColor: Colors.background,
  },
});

export default Container;

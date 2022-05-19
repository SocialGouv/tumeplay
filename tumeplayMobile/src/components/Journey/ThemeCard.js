import {View, StyleSheet, Image} from 'react-native';
import TextBase from '../Text';
import React from 'react';
import config from '../../../config';
import {REACT_APP_URL} from '@env';

const ThemeCard = props => {
  const {style, selectedTheme, moduleCount} = props;

  return (
    <View style={[style, styles.box]}>
      <View style={styles.textContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: REACT_APP_URL + selectedTheme?.image?.url}}
            style={styles.image}
          />
        </View>
        <TextBase style={styles.text}>{selectedTheme?.title}</TextBase>
      </View>
      <TextBase style={[styles.text, {marginRight: 10, marginVertical: 5}]}>
        {moduleCount} défis restants{' '}
      </TextBase>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#000',
    width: config.deviceWidth * 0.35,
    height:
      config.deviceHeight > 667
        ? config.deviceHeight * 0.08
        : config.deviceHeight * 0.09,
    borderRadius: config.deviceWidth * 0.03,
    padding: 15,
    justifyContent: 'center',
    alignContent: 'center',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize:
      config.deviceHeight > 667
        ? config.deviceHeight * 0.012
        : config.deviceHeight * 0.015,
    fontWeight: 'bold',
    paddingVertical: 1,
    textAlign: 'center',
    marginHorizontal: 7,
  },
  imageContainer: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 25,
    height: 25,
    paddingVertical: 1,
    padding: 5,
  },
});
export default ThemeCard;

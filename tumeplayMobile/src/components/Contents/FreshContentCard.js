import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {Fonts} from '../../styles/Style';
import {REACT_APP_URL} from '@env';
import bg from '../../assets/test.png';

const FreshContentCard = ({content}) => {
  const imageUrl = {uri: REACT_APP_URL + content?.image?.url};

  return (
    <ImageBackground style={styles.container} source={imageUrl}>
      <ImageBackground style={styles.image} source={bg}>
        <Text style={styles.level}>Niveau 1</Text>
        <Text style={styles.title}>{content?.title}</Text>
      </ImageBackground>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 180,
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  image: {
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  level: {
    fontFamily: Fonts.strongText,
    color: '#E85439',
    lineHeight: 21,
    fontSize: 14,
    paddingLeft: 20,
    paddingTop: 15,
  },
  title: {
    width: '100%',
    paddingBottom: 28,
    paddingLeft: 20,
    fontFamily: Fonts.subtitle,
    fontSize: 18,
    lineHeight: 24,
  },
  subtitle: {},
});

export default FreshContentCard;

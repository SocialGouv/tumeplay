import React from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Fonts} from '../../styles/Style';
import {REACT_APP_URL} from '@env';
import bg from '../../assets/test.png';

const FreshContentCard = ({content, navigation, freshContentsIds}) => {
  const imageUrl = {uri: REACT_APP_URL + content?.image?.url};

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('Content', {
          content_id: content.id,
          contents_ids: freshContentsIds,
        })
      }>
      <ImageBackground style={styles.image} source={imageUrl}>
        <ImageBackground style={styles.image} source={bg}>
          <Text style={styles.level}>Niveau 1</Text>
          <Text style={styles.title}>{content?.title}</Text>
        </ImageBackground>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 170,
    height: 118,
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  image: {
    height: '100%',
    width: '100%',
    zIndex: 1,
    borderRadius: 8,
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

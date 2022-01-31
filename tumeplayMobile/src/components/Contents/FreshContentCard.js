import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../../styles/Style';
import {REACT_APP_URL} from '@env';
import config from '../../../config';
import FreshContentSkeleton from '../global/SkeletonDesign/FreshContentSkeleton';

const FreshContentCard = ({content, navigation, freshContentsIds}) => {
  const imageUrl = {uri: REACT_APP_URL + content?.image?.url};

  return content ? (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('Content', {
          content_id: content.id,
          contents_ids: freshContentsIds,
        })
      }>
      <View>
        <Image style={styles.image} source={imageUrl} />
        <Text style={styles.level}>Niveau 1</Text>
        <Text style={styles.title}>{content?.title}</Text>
      </View>
    </TouchableOpacity>
  ) : (
    <FreshContentSkeleton />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 5,
  },
  image: {width: '100%', height: 150},
  level: {
    fontFamily: Fonts.strongText,
    color: '#E85439',
    fontWeight: 'bold',
    lineHeight: 21,
    fontSize: 14,
    paddingTop: 15,
    textTransform: 'uppercase',
  },
  title: {
    width: '100%',
    paddingBottom: 28,
    fontFamily: Fonts.strongText,
    fontSize: config.deviceWidth <= 375 ? 14 : 16,
    lineHeight: 24,
    color: Colors.black,
  },
  subtitle: {},
});

export default FreshContentCard;

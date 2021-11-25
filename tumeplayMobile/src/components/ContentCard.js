import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Fonts} from '../styles/Style';

const ContentCard = ({item, backgroundColor, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Content', {content: item})}
      style={[styles.container, {backgroundColor: backgroundColor}]}>
      <Text style={styles.level}>NIVEAU 1</Text>
      <Text style={styles.title}>{item?.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 130,
    marginVertical: 1,
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
    width: '50%',
    paddingBottom: 28,
    paddingLeft: 20,
    fontFamily: Fonts.subtitle,
    fontSize: 18,
    lineHeight: 24,
  },
});

export default ContentCard;

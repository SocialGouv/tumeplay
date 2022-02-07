import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../styles/Style';

const CategorieIndicator = ({thematique}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CATÉGORIE</Text>
      {thematique ? (
        <Text style={[styles.text, {color: Colors.primary}]}>{thematique}</Text>
      ) : (
        <ContentLoader style={styles.loader} speed={2}>
          <Rect x="5" y="5" rx="3" ry="3" width="200" height="20" />
        </ContentLoader>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 240,
    minHeight: 60,
    maxHeight: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F3E1E8',
    padding: 12,
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.black,
    textTransform: 'uppercase',
  },
  loader: {
    maxHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategorieIndicator;

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../styles/Style';

const CategorieIndicator = ({thematique}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CATÉGORIE</Text>
      <Text style={[styles.text, {color: Colors.primary}]}>{thematique}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 240,
    minHeight: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E85439',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFF',
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
});

export default CategorieIndicator;

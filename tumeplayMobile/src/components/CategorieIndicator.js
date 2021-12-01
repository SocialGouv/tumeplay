import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CategorieIndicator = ({categorie}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CATÉGORIE</Text>
      <Text style={styles.text}>{categorie?.title} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 240,
    height: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E85439',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
});

export default CategorieIndicator;

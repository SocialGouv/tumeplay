import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, Image, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const BoxCard = props => {
  const {index, title, box, description, navigation} = props;
  const handleNavigation = () => {
    navigation.navigate('BoxOrder', {box: box});
  };

  return (
    <TouchableOpacity onPress={() => handleNavigation()} style={styles.boxCard}>
      <View>
        <Text style={styles.titleIndex}>KIT {index}</Text>
        <Text style={styles.titleBox}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.moreInfo}>+ d'infos</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boxCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 12,
    paddingLeft: 20,
  },
  radio: {
    paddingRight: 20,
  },
  titleIndex: {
    color: 'red',
    fontSize: 16,
    lineHeight: 22,
  },
  titleBox: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  description: {
    color: Colors.black,
    fontWeight: '400',
    fontSize: 14,
  },
  moreInfo: {
    color: 'red',
    fontWeight: '400',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  image: {
    position: 'absolute',
    right: 0,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 90,
  },
});

export default BoxCard;

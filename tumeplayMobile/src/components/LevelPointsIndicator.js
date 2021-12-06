import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import coin from '../assets/coin.png';

const LevelPointsIndicator = ({points}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NIVEAU 1</Text>
      <View style={styles.pointsContainer}>
        <Image source={coin} style={styles.image} />
        <Text style={styles.text}>{points} / 3000 </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#ECC160',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  pointsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {},
  image: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
});

export default LevelPointsIndicator;

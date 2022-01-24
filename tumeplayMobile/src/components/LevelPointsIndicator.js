import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AppContext from '../../AppContext';
import coin from '../assets/coin.png';
import {Colors} from '../styles/Style';

const LevelPointsIndicator = ({style, onPress}) => {
  const context = useContext(AppContext);

  const points = context.points;

  return (
    <TouchableOpacity style={[style, styles.container]} onPress={onPress}>
      <Text style={styles.level}>NIVEAU 1</Text>
      <View style={styles.pointsContainer}>
        <Text style={styles.text}>{points} / 3000 </Text>
        <Image source={coin} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ECC160',
    borderWidth: 2,
    borderRadius: 4,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  pointsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: 'bold',
    color: Colors.black,
    paddingRight: 5,
  },
  level: {
    paddingRight: 15,
    fontWeight: 'bold',
    color: Colors.black,
  },
  image: {
    width: 15,
    height: 15,
  },
});

export default LevelPointsIndicator;

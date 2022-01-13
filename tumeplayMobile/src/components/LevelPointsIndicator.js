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
      <Text style={styles.text}>NIVEAU 1</Text>
      <View style={styles.pointsContainer}>
        <Image source={coin} style={styles.image} />
        <Text style={styles.text}>{points} / 3000 </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#ECC160',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFF',
    paddingHorizontal: 5,
  },
  pointsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: Colors.black,
  },
  image: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
});

export default LevelPointsIndicator;

import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AppContext from '../../../AppContext';
import coin from '../../assets/coin.png';

const TopLevelPointIndicator = ({style}) => {
  const context = useContext(AppContext);
  const points = context.points;

  return (
    <View style={[style, styles.container]}>
      <Text>Niveau 1</Text>
      <View style={styles.pointsContainer}>
        <Image source={coin} style={styles.image} />
        <Text>{points} / 3000</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    alignItems: 'center',
  },
  pointsContainer: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginRight: 18,
    borderRadius: 8,
  },
  image: {
    width: 15,
    height: 15,
    margin: 5,
  },
});

export default TopLevelPointIndicator;

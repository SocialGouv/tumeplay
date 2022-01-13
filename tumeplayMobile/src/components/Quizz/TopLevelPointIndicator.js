import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AppContext from '../../../AppContext';
import coin from '../../assets/coin.png';
import {Colors} from '../../styles/Style';

const TopLevelPointIndicator = ({style}) => {
  const context = useContext(AppContext);
  const points = context.points;

  return (
    <View style={[style, styles.container]}>
      <Text style={[styles.text, styles.textLevel]}>Niveau 1</Text>
      <View style={styles.pointsContainer}>
        <Image source={coin} style={styles.image} />
        <Text style={styles.text}>
          {''} {points} / 3000
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
    alignItems: 'center',
  },
  pointsContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 12,
    paddingLeft: 5,
    paddingVertical: 5,
    borderRadius: 8,
  },
  image: {
    width: 15,
    height: 15,
  },
  text: {
    color: Colors.black,
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  textLevel: {
    paddingRight: 11,
  },
});

export default TopLevelPointIndicator;

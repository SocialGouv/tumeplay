import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Text from '../../Text';
import React from 'react';
import blackMapMarker from '../../../assets/mapMarker.png';
import orangeMapMarker from '../../../assets/orangeMarker.png';
import {Divider} from 'react-native-paper';
import config from '../../../../config';

const PickupCard = props => {
  const {item, onPress, index} = props;

  return (
    <>
      <TouchableOpacity
        style={[
          styles.cardContainer,
          item.selected && {backgroundColor: '#FEF0DC'},
        ]}
        onPress={onPress}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={item.selected ? orangeMapMarker : blackMapMarker}
            style={styles.image}>
            <Text style={styles.number}>{index + 1}</Text>
          </ImageBackground>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.LgAdr1}</Text>
          <Text style={styles.address}>{item.LgAdr3}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Text style={styles.address}>{item.Ville}</Text>
            <Text style={[styles.address, {paddingLeft: 10}]}>{item.CP}</Text>
          </View>
        </View>
        <Text style={styles.rightText}>{item.Distance} m</Text>
      </TouchableOpacity>
      <Divider style={[styles.divider, {marginBottom: 0}]} />
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 85,
    flexDirection: 'row',
  },
  textContainer: {
    paddingVertical: 5,
  },
  name: {
    fontWeight: '600',
    fontSize: config.deviceWidth * 0.04,
  },
  address: {
    fontWeight: '400',
    fontSize: config.deviceWidth * 0.04,
  },
  number: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: config.deviceWidth * 0.04,
    zIndex: 10,
    paddingBottom: 5,
  },
  imageContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    position: 'relative',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  divider: {
    width: '100%',
    borderColor: '#EAE2D7',
    borderWidth: 1,
  },
  rightText: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    fontSize: config.deviceWidth * 0.03,
  },
});

export default PickupCard;

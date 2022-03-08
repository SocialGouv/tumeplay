import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
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
          <Image
            source={item.selected ? orangeMapMarker : blackMapMarker}
            style={styles.image}
          />
          <Text style={styles.number}>{index + 1}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.LgAdr1}</Text>
          <Text style={styles.address}>{item.LgAdr3}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Text style={styles.address}>{item.Ville}</Text>
            <Text style={[styles.address, {paddingLeft: 10}]}>{item.CP}</Text>
          </View>
        </View>
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
    paddingHorizontal: 55,
    paddingVertical: 5,
  },
  name: {
    fontWeight: '600',
    fontSize: 18,
  },
  address: {
    fontWeight: '400',
    fontSize: 14,
  },
  number: {
    position: 'absolute',
    top: '20%',
    left: '98%',
    color: '#FFF',
    fontWeight: '600',
    fontSize: config.deviceWidth * 0.04,
  },
  imageContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    width: 30,
    height: 30,
    position: 'relative',
  },
  divider: {
    width: '100%',
    borderColor: '#EAE2D7',
    borderWidth: 1,
  },
});

export default PickupCard;

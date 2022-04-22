import React from 'react';
import {TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import Text from '../components/Text';
import Event from '../services/api/matomo';
import warning from '../assets/warning.png';
import config from '../../config';

const BoxCard = props => {
  const {index, title, box, description, navigation} = props;
  const handleNavigation = () => {
    navigation.navigate('BoxOrder', {box: box});
  };

  const lowStock = 10;

  return (
    <>
      {box.stock < lowStock && (
        <View style={styles.stockBadge}>
          <Image source={warning} style={styles.warningImage} />
          <Text style={styles.stockText}>RUPTURE DE STOCK</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => {
          Event.boxChoiceEvent(title);
          handleNavigation();
        }}
        disabled={box.stock < lowStock}
        style={[styles.boxCard, box.stock < lowStock && styles.boxCardBlocked]}>
        <View>
          <Text style={styles.titleIndex}>KIT {index}</Text>
          <Text style={styles.titleBox}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </TouchableOpacity>
    </>
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
  boxCardBlocked: {
    opacity: 0.5,
    backgroundColor: '#fff',
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
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  description: {
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
  stockBadge: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FBF7F2',
    height: 30,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 3,
  },
  warningImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  stockText: {
    fontSize: config.deviceWidth * 0.03,
    fontWeight: '700',
  },
});

export default BoxCard;

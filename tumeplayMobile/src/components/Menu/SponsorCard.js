import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../Text';
import React from 'react';
import config from '../../../config';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SponsorCard = () => {
  return (
    <View style={styles.container}>
      <Icon name="redeem" size={40} color="#000" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Parraine tes amis</Text>
        <Text style={styles.description}>
          Parraine au moins 3 de tes amis pour gagner 1 kit !
        </Text>
      </View>
      <TouchableOpacity>
        <Icon name="chevron-right" size={40} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: config.deviceWidth * 0.9,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAE2D7',
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    width: '70%',
  },
  icon: {
    alignSelf: 'flex-start',
    marginRight: 10,
  },
});

export default SponsorCard;

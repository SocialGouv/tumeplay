import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import image from '../../assets/LOGO_COLISSIMO.png';
import Button from '../Button';

const OrderConfirm = props => {
  const {userInfos, setOrderConfirm} = props;
  console.log(userInfos);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.smallContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.boldText}>
              {userInfos.first_name + ' ' + userInfos.last_name}
            </Text>
          </View>
          <View>
            <Text style={styles.text}>Adresse de livraison :</Text>
            <Text style={styles.text}>{userInfos.address}</Text>
            <Text style={styles.text}>{userInfos.phone_number}</Text>
            <Text style={styles.text}>{userInfos.email}</Text>
          </View>
        </View>
        <View style={styles.smallContainer}>
          <TouchableOpacity onPress={() => setOrderConfirm(false)}>
            <Text style={styles.redText}>Modifier les informations</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Image source={image} style={styles.image} />
        <View>
          <Text style={styles.text}>
            Disponible entre{' '}
            <Text style={styles.boldText}>3 et 5 jours ouvrés.</Text> À noter,
            pas d'envoi d'email de la part de Colissimo
          </Text>
        </View>
      </View>
      <Button text="Je valide cette commande" size="intermediate" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FBF7F2',
  },
  topContainer: {
    flexDirection: 'row',
  },
  smallContainer: {
    flex: 1,
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  nameContainer: {
    flexDirection: 'row',
  },
  redText: {
    color: '#D42201',
    lineHeight: 22,
    fontWeight: '500',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  boldText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
  },
  image: {
    width: 50,
    height: 50,
  },
  bottomContainer: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});

export default OrderConfirm;

import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Text from '../../Text';
import {Colors} from '../../../styles/Style';
import config from '../../../../config';
import axios from 'axios';
import Button from '../../Button';
import AppContext from '../../../../AppContext';
import OrdersAPI from '../../../services/api/orders';
import ContactsAPI from '../../../services/api/contact';
import OrderConfirmModal from '../OrderConfirmModal';
import {useNavigation} from '@react-navigation/native';
import mrLogo from '../../../assets/MR_logo.png';
import CheckBox from '@react-native-community/checkbox';

const PickupOrderConfirm = props => {
  const navigation = useNavigation();
  const {selectedPOI, userInfos, setOrderConfirm, setSelectedPOI, box} = props;
  const {strapi_user_id, reloadUser} = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sendOrder = async () => {
    setIsLoading(true);
    let requestBody = {
      first_name: userInfos.first_name,
      last_name: userInfos.last_name,
      email: userInfos.email,
      phone: userInfos.phone_number,
      address: selectedPOI.LgAdr3,
      address_zipcode: selectedPOI.CP,
      address_region: selectedPOI.address_region,
      address_deptcode: selectedPOI.deptcode,
      address_dept: selectedPOI.dept,
      poi_name: selectedPOI.LgAdr1,
      address_city: selectedPOI.Ville,
      poi_number: selectedPOI.Num,
      delivery: 'pickup',
      box_name: box.title,
      environnement: 'metropole',
      utilisateurs_mobile: strapi_user_id,
      content: [
        {
          __component: 'commandes.box',
          box: box.id,
        },
      ],
    };
    await OrdersAPI.orderBoxes(requestBody);
    if (checked) {
      let userAddress = {
        first_name: userInfos.first_name,
        email: userInfos.email,
        zipCode: selectedPOI.CP,
        box_id: box.id,
        type: 'enrollé',
      };
      await ContactsAPI.postContact(userAddress);
    }
    reloadUser();
    setIsLoading(false);
    setIsVisible(true);
  };

  const retrievePOILocationInformations = async () => {
    const latLng = {
      lat: parseFloat(selectedPOI.Latitude.replace(',', '.')),
      long: parseFloat(selectedPOI.Longitude.replace(',', '.')),
    };
    let response = await axios.get(
      `https://api-adresse.data.gouv.fr/reverse/?lon=${latLng.long}&lat=${latLng.lat}`,
    );
    const tmpPOI = {...selectedPOI};
    tmpPOI.deptcode =
      response?.data?.features[0]?.properties?.context?.split(',')[0];
    tmpPOI.dept =
      response?.data?.features[0]?.properties?.context?.split(',')[1];
    tmpPOI.address_region =
      response?.data?.features[0]?.properties?.context?.split(',')[2];
    setSelectedPOI({...tmpPOI});
  };

  const handleClosingModal = () => {
    if (!isLoading) {
      navigation.navigate('Home', {screen: 'Accueil'});
      setIsVisible(false);
    }
  };

  useEffect(() => {
    retrievePOILocationInformations();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfosContainer}>
        <View>
          <Text style={styles.title}>
            {userInfos.first_name + ' ' + userInfos.last_name}
          </Text>
          <Text style={styles.text}>{userInfos.phone_number}</Text>
          <Text style={styles.text}>{userInfos.email}</Text>
        </View>
        <TouchableOpacity onPress={() => setOrderConfirm(false)}>
          <Text style={styles.redText}>Modifier</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            style={styles.checkbox}
            animationDuration={0.2}
            value={checked}
            tintColors={
              Platform.OS === 'android'
                ? {true: Colors.primary, flase: Colors.black}
                : '#000'
            }
            onTintColor={Colors.primary}
            onCheckColor={Colors.primary}
            onValueChange={() => setChecked(!checked)}
          />
          <Text style={[styles.bottomText, {width: 290, paddingLeft: 25}]}>
            J 'accepte d' être recontacté par Tumeplay pour améliorer le service
          </Text>
        </View>
        <View style={styles.bottomtextContainer}>
          <Image source={mrLogo} style={styles.logo} />
          <Text style={styles.bottomText}>
            Disponible entre{' '}
            <Text style={styles.boldText}>1 à 2 semaines.</Text>
            Tu seras notifié.e par email à la prise en charge de ton colis et à
            la réception en point relais
          </Text>
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button
          style={styles.button}
          text="Je valide cette commande"
          size="large"
          special
          onPress={() => sendOrder()}
        />
      )}
      {isVisible && (
        <OrderConfirmModal isVisible={isVisible} onPress={handleClosingModal} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  userInfosContainer: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    width: '100%',
    alignItems: 'flex-end',
  },
  title: {
    fontWeight: '600',
    fontSize: config.deviceWidth * 0.043,
    lineHeight: 22,
  },
  text: {
    fontWeight: '400',
    fontSize: config.deviceWidth * 0.04,
    lineHeight: 22,
  },
  redText: {
    color: '#D42201',
    lineHeight: 22,
    fontWeight: '500',
    fontSize: config.deviceWidth > 375 ? 14 : 13,
    textDecorationLine: 'underline',
  },
  button: {
    marginBottom: 20,
  },
  bottomContainer: {
    flex: 0.6,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomtextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 22,
    width: config.deviceWidth > 375 ? 290 : 285,
  },
  boldText: {
    fontSize: config.deviceWidth * 0.035,
    fontWeight: '600',
  },
  logo: {
    marginRight: 15,
    width: config.deviceWidth * 0.12,
    height: config.deviceWidth * 0.12,
  },
});

export default PickupOrderConfirm;

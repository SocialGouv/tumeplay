import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Text from '../../components/Text';
import React, {useContext, useState} from 'react';
import image from '../../assets/LOGO_COLISSIMO.png';
import Button from '../Button';
import OrdersAPI from '../../services/api/orders';
import config from '../../../config';
import {useNavigation} from '@react-navigation/native';
import AppContext from '../../../AppContext';
import CheckBox from '@react-native-community/checkbox';
import TextBase from '../../components/Text';
import ContactsAPI from '../../services/api/contact';
import {Colors} from '../../styles/Style';
// import OrderConfirmModal from './OrderConfirmModal';
import Event from '../../services/api/matomo';

const OrderConfirm = props => {
  const {
    userInfos,
    setOrderConfirm,
    userAdressInformations,
    deliveryMode,
    box,
  } = props;

  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [isVisible, setIsVisible] = useState(false);

  const {strapi_user_id, reloadUser} = useContext(AppContext);

  const navigation = useNavigation();

  const sendOrder = async () => {
    setIsLoading(true);
    const deptcode = userAdressInformations?.context?.split(',')[0];
    const dept = userAdressInformations?.context?.split(',')[1];
    const region = userAdressInformations?.context?.split(',')[2];
    let requestBody = {
      first_name: userInfos.first_name,
      last_name: userInfos.last_name,
      email: userInfos.email,
      phone: userInfos.phone_number,
      address: userInfos.address,
      address_region: region,
      address_deptcode: deptcode,
      address_dept: dept,
      address_zipcode: userAdressInformations.postcode,
      address_city: userAdressInformations.city,
      box_name: box.title,
      delivery: deliveryMode,
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
        zipCode: userAdressInformations.postcode,
        box_id: box.id,
        type: 'enrollé',
      };
      await ContactsAPI.postContact(userAddress);
    }

    reloadUser();
    setIsLoading(false);
    Event.orderConfirmEvent('homedeliveryOrderconfirmedButton');
    navigation.navigate('OrderFinalStep');
  };

  // const handleClosingModal = () => {
  //   if (!isLoading) {
  //     Event.boxOrdered();
  //     navigation.navigate('Home', {screen: 'Accueil'});
  //     setIsVisible(false);
  //   }
  // };

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
        <View style={styles.leftSmallContainer}>
          <TouchableOpacity onPress={() => setOrderConfirm(false)}>
            <Text style={styles.redText}>Modifier</Text>
          </TouchableOpacity>
        </View>
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
          <TextBase style={[styles.bottomText, {width: 290, paddingLeft: 10}]}>
            J 'accepte d' être recontacté par Tumeplay pour améliorer le service
          </TextBase>
        </View>
        <View style={styles.bottomColissimo}>
          <Image source={image} style={styles.image} />
          <View style={styles.bottomtextContainer}>
            <Text style={styles.bottomText}>
              Disponible entre{' '}
              <Text style={styles.bottomBoldText}>1 à 2 semaines.</Text> À
              noter, pas d'envoi d'email de la part de Colissimo
            </Text>
          </View>
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
      {/* {isVisible && (
        <OrderConfirmModal isVisible={isVisible} onPress={handleClosingModal} />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#FBF7F2',
  },
  topContainer: {
    flexDirection: 'row',
  },
  smallContainer: {
    flex: 0.7,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  leftSmallContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 12,
  },
  nameContainer: {
    flexDirection: 'row',
  },
  redText: {
    color: '#D42201',
    lineHeight: 22,
    fontWeight: '500',
    fontSize: config.deviceWidth > 375 ? 14 : 13,
    textDecorationLine: 'underline',
  },
  boldText: {
    fontSize: config.deviceWidth > 375 ? 14 : 14,
    lineHeight: 22,
    fontWeight: '600',
  },
  text: {
    fontSize: config.deviceWidth > 375 ? 14 : 14,
    lineHeight: 22,
    fontWeight: '400',
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 20,
    marginRight: 10,
  },
  bottomText: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400',
  },
  bottomBoldText: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
  },
  checkbox: {
    position: Platform.OS === 'ios' ? 'absolute' : 'relative',
    marginRight: Platform.OS === 'android' ? 10 : 0,
    right: config.deviceWidth > 375 ? 20 : 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bottomtextContainer: {
    paddingBottom: 22,
    width: config.deviceWidth > 375 ? 290 : 280,
  },
  bottomColissimo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  bottomContainer: {
    flex: 0.9,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  button: {
    alignSelf: 'center',
  },
});

export default OrderConfirm;

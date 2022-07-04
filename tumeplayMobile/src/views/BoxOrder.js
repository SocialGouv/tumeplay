import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../components/Text';
import Container from '../components/global/Container';
import HomeOrdersInput from '../components/Orders/HomeOrdersInput';
import OrderConfirm from '../components/Orders/OrderConfirm';
import config from '../../config';
import {Divider} from 'react-native-paper';
import Tooltip from 'react-native-walkthrough-tooltip';
import {Colors} from '../styles/Style';
import Icon from 'react-native-vector-icons/Entypo';
import PickupOrder from '../components/Orders/Pickup/PickupOrder';
import PickupOrderUserInfos from '../components/Orders/Pickup/PickupOrderUserInfos';
import AppContext from '../../AppContext';
import ReferentIntention from '../components/Orders/ReferentIntention';

const Box = ({navigation, route}) => {
  const {box} = route.params;
  const {user} = useContext(AppContext);
  const [deliveryMode, setDeliveryMode] = useState('home');
  const [userInfos, setUserInfos] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    phone_number: '',
  });
  const [userAdressInformations, setUserAdressInformations] = useState();
  const [orderConfirm, setOrderConfirm] = useState(false);
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [selectedPOI, setSelectedPOI] = useState(null);

  const displayCorrectScreen = () => {
    if (deliveryMode === 'home') {
      return !orderConfirm ? (
        <HomeOrdersInput
          userInfos={userInfos}
          setUserInfos={setUserInfos}
          setOrderConfirm={setOrderConfirm}
          setUserAdressInformations={setUserAdressInformations}
        />
      ) : (
        <>
          <OrderConfirm
            userInfos={userInfos}
            setOrderConfirm={setOrderConfirm}
            deliveryMode={deliveryMode}
            userAdressInformations={userAdressInformations}
            box={box}
          />
        </>
      );
    } else if (deliveryMode === 'pickup') {
      return selectedPOI === null ? (
        <PickupOrder setSelectedPOI={setSelectedPOI} />
      ) : (
        <PickupOrderUserInfos
          selectedPOI={selectedPOI}
          userInfos={userInfos}
          orderConfirm={orderConfirm}
          setUserInfos={setUserInfos}
          setOrderConfirm={setOrderConfirm}
          setSelectedPOI={setSelectedPOI}
          box={box}
        />
      );
    } else {
      return <ReferentIntention user={user} />;
    }
  };

  return (
    <Container style={styles.container}>
      <View style={styles.topInfoContainer}>
        <TouchableOpacity
          onPress={() => {
            if (orderConfirm) {
              setOrderConfirm(false);
            } else {
              navigation.goBack();
            }
          }}
          style={styles.backButton}>
          <Icon name="chevron-small-left" size={40} color="#000" />
          <Text>Retour</Text>
        </TouchableOpacity>
        {orderConfirm ? (
          <>
            <Text style={styles.info}>Tu as séléctionné</Text>
            <View>
              <Text style={styles.redText}>KIT {box.number}</Text>
              <Text style={styles.boxTitle}>{box.title}</Text>
            </View>
            <Divider style={[styles.divider, {marginBottom: 0}]} />
          </>
        ) : (
          <View>
            <Text style={styles.subtitle}>
              Où souhaites-tu recevoir ton kit ?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setDeliveryMode('home')}
                style={[
                  styles.buttons,
                  deliveryMode === 'home'
                    ? styles.activeButton
                    : styles.nonActiveButton,
                ]}>
                <Text
                  style={
                    deliveryMode === 'home'
                      ? styles.whiteText
                      : styles.blackText
                  }>
                  A DOMICILE
                </Text>
              </TouchableOpacity>
              <Tooltip
                isVisible={toolTipVisible}
                content={
                  <Text style={styles.tooltipText}>Bientôt disponible</Text>
                }
                placement="bottom"
                onClose={() => setToolTipVisible(false)}>
                <TouchableOpacity
                  onPress={() => setDeliveryMode('pickup')}
                  style={[
                    styles.buttons,
                    styles.buttonRight,
                    deliveryMode === 'pickup'
                      ? styles.activeButton
                      : styles.nonActiveButton,
                  ]}>
                  <Text
                    style={
                      deliveryMode === 'pickup'
                        ? styles.whiteText
                        : styles.blackText
                    }>
                    EN POINT RELAIS
                  </Text>
                </TouchableOpacity>
              </Tooltip>
              <TouchableOpacity
                onPress={() => setDeliveryMode('referent')}
                style={[
                  styles.buttons,
                  styles.buttonRight,
                  deliveryMode === 'referent'
                    ? styles.activeButton
                    : styles.nonActiveButton,
                ]}>
                <Text
                  style={
                    deliveryMode === 'referent'
                      ? styles.whiteText
                      : styles.blackText
                  }>
                  Chez un référent
                </Text>
              </TouchableOpacity>
            </View>
            <Divider style={[styles.divider, {marginBottom: 0}]} />
          </View>
        )}
      </View>
      <View style={styles.inputContainer}>{displayCorrectScreen()}</View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topInfoContainer: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: Colors.background,
    zIndex: 1,
  },
  backButton: {
    justifyContent: 'flex-start',
    width: '100%',
    paddingLeft: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: config.deviceWidth > 375 ? 20 : 5,
  },
  info: {
    fontSize: 14,
    lineHeight: 22,
    paddingLeft: 22,
  },
  redText: {
    color: '#D42201',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    paddingLeft: 22,
  },
  boxTitle: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    paddingLeft: 22,
  },
  divider: {
    width: '100%',
    borderColor: '#EAE2D7',
    borderWidth: 1,
    marginTop: config.deviceWidth > 375 ? 23 : 15,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    paddingLeft: 22,
    paddingTop: 5,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: config.deviceWidth > 375 ? 20 : 10,
  },
  buttons: {
    borderColor: '#EAE2D7',
    borderWidth: 1,
    borderRadius: 50,
    minHeight: 38,
    width: 125,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  tooltipText: {
    padding: 5,
    fontSize: 14,
    color: Colors.primary,
  },
  whiteText: {
    color: '#FFF',
  },
  blackText: {
    color: '#000',
  },
  activeButton: {
    backgroundColor: '#000',
  },
  nonActiveButton: {
    backgroundColor: '#FFFF',
  },
  inputContainer: {
    width: '100%',
    zIndex: 0,
    backgroundColor: '#FFFF',
    flex: 2,
  },
});

export default Box;

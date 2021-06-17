import React, {useState, forwardRef} from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {EventRegister} from 'react-native-event-listeners';

import Splitter from '../components/tunnel/Splitter';
import Backlink from '../components/tunnel/Backlink';
import ProductContentList from '../components/tunnel/ProductContentList';
import ProductErrorModal from '../components/tunnel/ProductErrorModal';

import UserService from '../../services/User';

import Styles from '../../styles/Styles';

import TunnelCartSummaryStyle from '../../styles/components/TunnelCartSummary';
import OrdersAPI from '../../services/api/orders';

TunnelCartSummary.propTypes = {
  navigation: PropTypes.object,
};

export default function TunnelCartSummary(props) {
  const [showMaxLimitModal, setShowMaxLimitModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedItem] = useState(props.navigation.state.params.selectedItem);
  const [deliveryType] = useState(props.navigation.state.params.deliveryType);
  const [selectedPickup] = useState(
    props.navigation.state.params.selectedPickup,
  );
  const [selectedProducts] = useState(
    props.navigation.state.params.selectedProducts,
  );
  const [userAdress] = useState(props.navigation.state.params.userAdress);

  async function _confirmOrder() {

    //ORDER STRAPI API
    let orderPost;
    if (selectedItem.__typename === 'Box') {
      orderPost = await OrdersAPI.orderBoxes({
        first_name: userAdress.firstName,
        last_name: userAdress.lastName,
        email: userAdress.emailAdress,
        delivery: deliveryType,
        content: [
          {
            __component: 'commandes.box',
            box: selectedItem.id,
          },
        ],
      });
    } else if (selectedItem.__typename === 'BoxSurMesure') {
      orderPost = await OrdersAPI.orderBoxes({
        first_name: userAdress.firstName,
        last_name: userAdress.lastName,
        email: userAdress.emailAdress,
        delivery: deliveryType,
        content: [
          {
            __component: 'commandes.box-sur-mesure',
            produits: selectedProducts,
          },
        ],
      });
    }

    if (orderPost) {
      const _newTokens = await UserService.subTokens(1000);

      await UserService.setLastOrder();
      EventRegister.emit('tokensAmountChanged', _newTokens);

      setIsRunning(false);

      props.navigation.navigate('TunnelOrderConfirm', {
        selectedItem: selectedItem,
        selectedProducts: selectedProducts,
        userAdress: userAdress,
        selectedPickup: selectedPickup,
      });
    }
  }

  function _toggleErrorModal() {
    setShowErrorModal(!showErrorModal);
  }

  function _toggleMaxLimitModal() {
    setShowMaxLimitModal(!showMaxLimitModal);
  }

  const ForwardedErrorModal = forwardRef(() => (
    <ProductErrorModal
      showModal={showErrorModal}
      onClose={_toggleErrorModal}
      modalTitle={'Oups !'}>
      <Text>
        Une erreur est survenue lors de la validation. Nous t&apos;invitons à
        vérifier les données entrées et à réessayer ultérieurement.
      </Text>
    </ProductErrorModal>
  ));

  const ForwardedMaxLimitModal = forwardRef(() => (
    <ProductErrorModal
      showModal={showMaxLimitModal}
      onClose={_toggleMaxLimitModal}
      modalTitle={'Oups !'}>
      <Text>
        La limite de commande est dépassée. Nous t&apos;invitons à tester de
        nouveau dans quelques jours ou à essayer une autre box.
      </Text>
    </ProductErrorModal>
  ));

  function _onDone() {
    if (!isRunning) {
      setIsRunning(true);
      _confirmOrder();
    }
  }

  function _goBack() {
    props.navigation.navigate('TunnelUserAddress', {
      selectedItem: selectedItem,
      selectedProducts: selectedProducts,
      selectedPickup: selectedPickup,
      userAdress: userAdress,
    });
  }

  return (
    <ScrollView style={[Styles.flexOne, TunnelCartSummaryStyle.container]}>
      <Backlink step={4} onPress={_goBack} />

      <View style={{flex: 0.1}}>
        <Text style={Styles.tunnelTitle}>Ton récapitulatif</Text>
      </View>

      <Splitter />

      <View style={{flex: 0.2, marginBottom: 15}}>
        <Text style={TunnelCartSummaryStyle.title}>Tes articles</Text>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 7,
            justifyContent: 'center',
          }}>
          <View style={{flex: 0.35}}>
            <Image
              source={selectedItem.picture}
              style={{
                height: 150,
                borderTopLeftRadius: 7,
                borderBottomLeftRadius: 7,
                resizeMode: 'cover',
                width: '100%',
              }}
            />
          </View>
          <View style={{flex: 0.65, paddingLeft: 5}}>
            <Text style={TunnelCartSummaryStyle.productTitle}>
              {selectedItem.title}
            </Text>
            <ProductContentList
              shortMode={true}
              products={selectedProducts}
              item={selectedItem}
            />
          </View>
        </View>
      </View>

      <Splitter />

      <View style={{flex: 0.2}}>
        <View style={{flex: 0.2}}>
          <Text style={TunnelCartSummaryStyle.title}>Adresse de livraison</Text>
        </View>
        <View style={TunnelCartSummaryStyle.pictureAndTextWrapper}>
          <View>
            <Image
              style={TunnelCartSummaryStyle.pictureAndTextPicture}
              source={require('../../assets/pictures/map-pin.png')}
            />
          </View>
          <View>
            <Text
              style={[
                TunnelCartSummaryStyle.subTitle,
                TunnelCartSummaryStyle.emailAdress,
              ]}>
              {userAdress.firstName} {userAdress.lastName}
            </Text>
            {deliveryType == 'home' && (
              <Text style={[TunnelCartSummaryStyle.subTitle]}>
                {userAdress.adress}
                {'\n'}
                {userAdress.zipCode} {userAdress.city}
              </Text>
            )}
            {deliveryType == 'pickup' && (
              <Text
                style={[TunnelCartSummaryStyle.subTitle, {paddingBottom: 50}]}>
                {selectedPickup.name}
                {'\n'}
                {selectedPickup.street}
                {'\n'}
                {selectedPickup.zipCode} {selectedPickup.city}
                {'\n'}
              </Text>
            )}
          </View>
        </View>
      </View>

      <Splitter />

      <View style={{flex: 0.15}}>
        <Text style={[TunnelCartSummaryStyle.subTitle, {marginBottom: 8}]}>
          Nous t&apos;enverrons un mail pour t&apos;informer de
          l&apos;expédition de ta commande à :
        </Text>
        <View style={TunnelCartSummaryStyle.pictureAndTextWrapper}>
          <Image
            style={TunnelCartSummaryStyle.pictureAndTextPicture}
            source={require('../../assets/pictures/letterbox.png')}
          />

          <Text
            style={[
              TunnelCartSummaryStyle.subTitle,
              TunnelCartSummaryStyle.emailAdress,
            ]}>
            {userAdress.emailAdress}
          </Text>
        </View>
        {deliveryType == 'home' && (
          <View style={TunnelCartSummaryStyle.pictureAndTextWrapper}>
            <Image
              style={TunnelCartSummaryStyle.pictureAndTextPicture}
              source={require('../../assets/pictures/picto-phone.png')}
            />

            <Text
              style={[
                TunnelCartSummaryStyle.subTitle,
                TunnelCartSummaryStyle.emailAdress,
              ]}>
              {userAdress.phoneNumber}
            </Text>
          </View>
        )}

        <Splitter />

        <Text
          style={[
            TunnelCartSummaryStyle.subTitle,
            {marginTop: 10, fontSize: 12},
          ]}>
          À ce jour, la commande de box n&apos;est malheureusement pas
          illimitée. Tu ne pourras commander que quelques box.
        </Text>
      </View>

      <View style={{flex: 0.25, height: 60, marginTop: 15, marginBottom: 25}}>
        <TouchableOpacity
          style={{
            flex: 1,

            paddingTop: 2,
            paddingBottom: 2,
            width: '50%',
            maxHeight: 70,
            alignSelf: 'center',
          }}
          onPress={_onDone}>
          <View style={Styles.tunnelButton}>
            <Text
              style={
                isRunning
                  ? Styles.tunnelButtonTextOpaque
                  : Styles.tunnelButtonText
              }>
              Valider
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ForwardedMaxLimitModal />
      <ForwardedErrorModal />
    </ScrollView>
  );
}

import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import TextWithSound from '../components/global/TextWithSound';
import PropTypes from 'prop-types';
import Colors from '../../styles/Color';
import Styles from '../../styles/Styles';
import Backlink from '../components/tunnel/Backlink';
import Splitter from '../components/tunnel/Splitter';

const REACT_APP_ZONE = REACT_APP_ZONE;

TunnelDeliverySelect.propTypes = {
  navigation: PropTypes.object,
};

export default function TunnelDeliverySelect(props) {
  const [selectedItem] = useState(props.navigation.state.params.selectedItem);
  const [selectedProducts] = useState(
    props.navigation.state.params.selectedProducts,
  );

  function _onContactClick() {
    props.navigation.navigate('StayInTouch');
  }

  function _onBadgeListClick() {
    props.navigation.navigate('TunnelBadgeList');
  }

  function _onDone(deliveryType) {
    const _params = {
      selectedItem: selectedItem,
      selectedProducts: selectedProducts,
      deliveryType: deliveryType,
    };
    if (deliveryType === 'home') {
      props.navigation.navigate('TunnelUserAddress', _params);
    } else if (deliveryType === 'pickup') {
      props.navigation.navigate('TunnelPickupSelect', _params);
    } else if (deliveryType === 'referent') {
      props.navigation.navigate('TunnelReferentSelect', _params)
    }
  }

  function _goBack() {
    props.navigation.navigate('TunnelProductSelect');
  }

  return (
    <View
      style={[
        Styles.flexOne,
        {
          flexBasis: 'auto',
          backgroundColor: Colors.backgroundColor,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 5,
          paddingBottom: 15,
        },
      ]}>
      <Backlink step={1} onPress={_goBack} />

      <View style={{flex: 0.4}}>
        {REACT_APP_ZONE === 'guyane' ?
          <TextWithSound style={Styles.tunnelTitle} sound={'mode-de-retrait_aEY6eeGr.mp3'} useLocal={true}>Choisis le mode de retrait</TextWithSound>
         :
          <Text style={Styles.tunnelTitle}>Choisis le mode de livraison</Text>
        }
        {REACT_APP_ZONE === 'guyane' ?
            <Text style={{color: '#FFFFFF', fontSize: 16, marginTop: 15}}>
            Choisis le référent chez qui tu souhaites retirer ta box. Le référent est là pour t’écouter et répondre à tes questions. Il te proposera un petit entretien la première fois que tu iras le voir. Pas de panique, 100% confidentialité, 0% stress !
            </Text>
          :
            <Text style={{color: '#FFFFFF', fontSize: 16, marginTop: 15}}>
              Nous ferons de notre mieux pour te livrer au plus vite ! Nos box sont
              100% discrètes ;)
            </Text>
        }
      </View>


      <View style={{flex: 0.4, marginTop: 30}}>
        {REACT_APP_ZONE === 'guyane' ?
          <TouchableOpacity
            style={{
              flex: 1,
              paddingTop: 2,
              paddingBottom: 2,
              width: '50%',
              height: 60,
              maxHeight: 60,
              minHeight: 60,
              alignSelf: 'center',
            }}
            onPress={() => _onDone('referent')}
          >
            <View style={Styles.tunnelButton}>
              <Text style={Styles.tunnelButtonText}>Chez un référent</Text>
            </View>
          </TouchableOpacity>
        :
          <>
            <TouchableOpacity
              style={{
                flex: 1,
                paddingTop: 2,
                paddingBottom: 2,
                width: '50%',
                height: 60,
                maxHeight: 60,
                minHeight: 60,
                alignSelf: 'center',
              }}
              onPress={() => _onDone('home')}>
              <View style={Styles.tunnelButton}>
                <Text style={Styles.tunnelButtonText}>A domicile</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                height: 60,
                maxHeight: 60,
                paddingTop: 2,
                paddingBottom: 2,
                marginBottom: 60,
                minHeight: 60,
                width: '50%',
                alignSelf: 'center',
              }}
              onPress={() => _onDone('pickup')}>
              <View style={Styles.tunnelButton}>
                <Text style={Styles.tunnelButtonText}>En point relais</Text>
              </View>
            </TouchableOpacity>
          </>
        }
        <Splitter />
        {REACT_APP_ZONE === 'guyane' ?
          <></>
          :
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 14,
              marginTop: 15,
              lineHeight: 22,
              fontFamily: Colors.textFont,
            }}>
            Actuellement la commande de box est disponible en Ile de France et en
            Nouvelle-Aquitaine.{'\n'}
            Si tu n&apos;es pas dans ces zones :{'\n'}
            Pour être informé·e de la sortie de l&apos;app&apos; dans ta région,
            laisse nous ton adresse mail{' '}
            <TouchableOpacity
              onPress={() => {
                _onContactClick();
              }}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                }}>
                ici
              </Text>
            </TouchableOpacity>
            .
          </Text>

        }
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 14,
            marginTop: 0,
            lineHeight: 22,
            fontFamily: Colors.textFont,
          }}>
          Pour accéder aux badges gagnés, c&apos;est{' '}
          <TouchableOpacity
            onPress={() => {
              _onBadgeListClick();
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
              }}>
              ici
            </Text>
          </TouchableOpacity>
          .
        </Text>
      </View>
    </View>
  );
}

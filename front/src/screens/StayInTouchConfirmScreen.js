import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

import PropTypes from 'prop-types';

import Colors from '../styles/Color';
import Styles from '../styles/Styles';

import UnderlineText from './components/global/UnderlineText';

StayInTouchConfirmScreen.propTypes = {
  navigation: PropTypes.object,
};

export default function StayInTouchConfirmScreen(props) {
  function _onDone() {
    const _target = props.navigation.state.params.outOfStock ? 'TunnelProductSelect' : 'LandingScreen';
    props.navigation.navigate(_target);
  }

  return (
    <View
      style={[
        Styles.flexOne,
        {
          backgroundColor: Colors.backgroundColor,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 15,
        },
      ]}>
      <View style={{flex: 0.5}}>
        <Image
          style={[Styles.contentPicture, {minHeight: 250}]}
          source={require('../assets/pictures/boarding/boarding-6.jpeg')}
        />
      </View>

      <View
        style={{flex: 0.15, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={[
            Styles.tunnelTitle,
            Styles.textCenter,
            {zIndex: 4, fontSize: 33},
          ]}>
          Ta demande a bien{'\n'}
          <UnderlineText borderMargin={-14}>
            été prise en compte !
          </UnderlineText>
        </Text>
      </View>
      <View style={{flex: 0.15, marginTop: 30}}>
        <Text
          style={[
            Styles.text,
            Styles.textCenter,
            {color: Colors.mainButton, fontSize: 26},
          ]}>
          {' '}
        </Text>
      </View>
      <View
        style={{
          flex: 0.12,
          paddingTop: 2,
          paddingBottom: 2,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height: 60,
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            paddingTop: 2,
            paddingBottom: 2,
            width: '40%',
            height: 60,
          }}
          onPress={_onDone}>
          <View style={Styles.tunnelButton}>
            <Text style={Styles.tunnelButtonText}>Fermer</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

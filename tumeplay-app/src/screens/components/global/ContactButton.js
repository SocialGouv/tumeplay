import React from 'react';
import {Linking, Image, View, Text, TouchableOpacity} from 'react-native';

import Styles from '../../../styles/Styles';

export default function ContactButton() {
  // @TODO : Pass this in global configuration
  function _contactMail() {
    Linking.openURL(
      'mailto:contact.tumeplay@fabrique.social.gouv.fr?subject=Tumeplay > Demande de contact',
    );
  }

  return (
    <View style={{flex: 0.25}}>
      <TouchableOpacity
        style={[Styles.landingBottomWrapper]}
        onPress={_contactMail}>
        <Text style={Styles.landingBottomText}>
          Tu te poses des questions ?{'\n'}Envoie-les nous !
        </Text>
        <View
          style={{
            flex: 0.25,
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            paddingRight: 10,
          }}>
          <Image
            style={{
              marginRight: 10,
              width: 10,
              height: 10,
              paddingTop: 25,
              resizeMode: 'contain',
            }}
            source={require('../../../assets/pictures/right-arrow.png')}
          />
          <Text style={Styles.landingBottomButtonNext}>Contacter</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

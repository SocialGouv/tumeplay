import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

import Styles from '../styles/Styles';
import Colors from '../styles/Color';

MoreThan25YearsScreen.propTypes = {
  lessThan25: PropTypes.func,
  moreThan25: PropTypes.func,
  onContactClick: PropTypes.func,
};
export default function MoreThan25YearsScreen(props) {
  const textStyle = {
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
    fontSize: 13,
    color: '#FFFFFF',
    fontFamily: Colors.textFont,
  };

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 7,
        backgroundColor: '#FEE7E3',
        position: 'relative',
      }}>
      <Image
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          minHeight: '100%',
          borderRadius: 7,
          resizeMode: 'stretch',
        }}
        source={require('../assets/age.jpg')}
      />

      <View style={{flex: 0.25}} />
      <View style={{flex: 0.1, paddingLeft: 35, paddingRight: 35}}>
        <Text style={[Styles.finishText, {color: 'white'}]}>
          Quel âge as-tu?
        </Text>
      </View>

      <View style={{flex: 0.25, marginTop: 15}}>
        <TouchableOpacity
          style={[Styles.bottomButton, {borderRadius: 25, maxHeight: 35}]}
          onPress={props.lessThan25}>
          <Text style={Styles.bottomCommText}>- de 25 ans</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.bottomButton, {borderRadius: 25, maxHeight: 35}]}
          onPress={props.moreThan25}>
          <Text style={Styles.bottomCommText}>+ de 25 ans</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          left: 0,
          bottom: 20,
          width: '100%',
          padding: 15,
        }}>
        <Text style={textStyle}>
          Actuellement la commande de box est disponible en Seine-et-Marne et en
          Nouvelle-Aquitaine.
        </Text>
        <Text style={textStyle}>――――</Text>
        <Text style={textStyle}>
          Pour être informé·e de la sortie de l&apos;app&apos; dans ta région,
          laisse nous ton adresse mail{' '}
          <TouchableOpacity onPress={props.onContactClick}>
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

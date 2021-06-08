import React, {useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';

import TunnelUserAdressStyle from '../../../styles/components/TunnelUserAdress';
import Styles from '../../../styles/Styles';

import PropTypes from 'prop-types';

CustomTextInput.propTypes = {
  inputLabel: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  isValid: PropTypes.number,
  onChangeText: PropTypes.func,
  currentValue: PropTypes.string,
  emailAdressWrongFormat: PropTypes.bool,
  phoneNumberWrongFormat: PropTypes.bool,
  emailAdressMismatch: PropTypes.bool,
  displayResetButton: PropTypes.bool,
  name: PropTypes.string,
  filterNumbers: PropTypes.bool,
  maxLength: PropTypes.number,
  isRequired: PropTypes.bool,
};

CustomTextInput.fieldStatus = {
  NEUTRAL: -1,
  INVALID: 0,
  VALID: 1,
};

export default function CustomTextInput(props) {
  let _myTextInput = false;

  function filterNumbers(value) {
    return value.replace(/[^0-9]/g, '');
  }

  function onChangeText(value) {
    let parsed = value;

    if (parsed.trim() == '') {
      parsed = parsed.trim();
    }

    if (props.filterNumbers) {
      parsed = filterNumbers(value);
    }

    if (props.maxLength) {
      parsed = parsed.substring(0, props.maxLength);
    }
    _myTextInput.setNativeProps({text: parsed});
    props.onChangeText(parsed);
  }

  useEffect(
    () => {
      if (props.currentValue) {
        _myTextInput.setNativeProps({text: props.currentValue});
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.currentValue],
  );

  return (
    <View style={[TunnelUserAdressStyle.inputWrapper, {position: 'relative'}]}>
      {typeof props.isRequired !== 'undefined' && !props.isRequired && (
        <Text style={Styles.labelText}>{props.inputLabel}</Text>
      )}
      {(typeof props.isRequired === 'undefined' || props.isRequired) && (
        <Text style={Styles.labelText}>{props.inputLabel} *</Text>
      )}

      <TextInput
        placeholder={props.inputPlaceholder}
        style={[
          Styles.inputTypeText,
          props.isValid !== undefined &&
          props.isValid == CustomTextInput.fieldStatus.INVALID
            ? TunnelUserAdressStyle.invalidTextField
            : false,
        ]}
        ref={component => (_myTextInput = component)}
        name={props.name}
        onChangeText={onChangeText}
        defaultValue={props.currentValue}
      />
      {props.displayResetButton && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 15,
            bottom: 10,
            height: 25,
            width: 25,
            paddingTop: 2,
            paddingBottom: 2,
            alignSelf: 'center',
          }}
          onPress={() => {
            _myTextInput.setNativeProps({text: ''});
            props.onChangeText('');
          }}>
          <Image
            style={{
              marginLeft: 10,
              marginRight: 10,
              width: 25,
              height: 25,
              resizeMode: 'contain',
            }}
            source={require('../../../assets/pictures/answer.wrong.png')}
          />
        </TouchableOpacity>
      )}
      {props.emailAdressWrongFormat && (
        <Text
          style={[
            Styles.placeholderText,
            {fontSize: 13, color: '#C80352', fontFamily: 'Chivo-Regular'},
          ]}>
          Le format du mail est incorrect
        </Text>
      )}
      {props.emailAdressMismatch && (
        <Text
          style={[
            Styles.placeholderText,
            {fontSize: 13, color: '#C80352', fontFamily: 'Chivo-Regular'},
          ]}>
          Les addresses e-mails indiquées ne correspondent pas.{' '}
          {props.emailAdressMismatch}
        </Text>
      )}
      {props.phoneNumberWrongFormat && (
        <Text
          style={[
            Styles.placeholderText,
            {fontSize: 13, color: '#C80352', fontFamily: 'Chivo-Regular'},
          ]}>
          Le format du numéro de téléphone est incorrect
        </Text>
      )}
    </View>
  );
}

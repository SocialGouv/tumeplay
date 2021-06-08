import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';

ModalCloseButton.propTypes = {
  onClose: PropTypes.func,
};

export default function ModalCloseButton(props) {
  return (
    <TouchableOpacity
      style={{position: 'absolute', right: 10, top: 10, zIndex: 10}}
      onPress={props.onClose}>
      <Image
        style={{width: 25, height: 25, resizeMode: 'contain'}}
        source={require('../../../assets/pictures/close.png')}
      />
    </TouchableOpacity>
  );
}

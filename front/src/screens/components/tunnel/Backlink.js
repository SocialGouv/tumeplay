import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

import BacklinkStyle from '../../../styles/components/TunnelBacklink';
import PropTypes from 'prop-types';

Backlink.propTypes = {
  step: PropTypes.number,
  onPress: PropTypes.func,
  text: PropTypes.string,
};

export default function Backlink(props) {
  const buttonText = props.steps ? 'étape ' + props.step + ' / 4' : props.text;

  return (
    <View style={BacklinkStyle.backlinkWrapper}>
      <TouchableOpacity
        style={BacklinkStyle.backlinkButton}
        onPress={props.onPress}>
        <Image
          style={BacklinkStyle.backlinkArrow}
          source={require('../../../assets/pictures/left-arrow.png')}
        />

        <Text style={BacklinkStyle.backlinkText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

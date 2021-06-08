import React from 'react';
import {
  Text,
  View,
  Linking,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

TextLink.propTypes = {
  targetUrl: PropTypes.string,
  children: PropTypes.object,
  style: PropTypes.object,
};
export default function TextLink(props) {
  function _openTarget() {
    Linking.openURL(props.targetUrl);
  }

  if (Platform.OS === 'web') {
    return (
      <TouchableWithoutFeedback>
        <View>
          <Text
            href={props.targetUrl}
            accessibilityRole="link"
            target="_blank"
            style={[{textDecorationLine: 'underline'}, props.style]}>
            {props.children}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableOpacity style={{flexWrap: 'wrap'}} onPress={_openTarget}>
      <Text style={{textDecorationLine: 'underline'}}>{props.children}</Text>
    </TouchableOpacity>
  );
}

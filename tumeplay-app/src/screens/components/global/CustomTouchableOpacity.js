import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';

CustomTouchableOpacity.propTypes = {
  onPress: PropTypes.func,
};

export default function CustomTouchableOpacity(props) {
  const {onPress, ...restProps} = props;
  return (
    <TouchableOpacity
      {...restProps}
      {...(Platform.OS === 'web'
        ? {
            // When scrolling the document body, the touchables might be triggered
            // see  https://github.com/necolas/react-native-web/issues/1219
            onClick: props.onPress,
          }
        : {
            onPress: props.onPress,
          })}
    />
  );
}
